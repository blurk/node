const chokidar = require("chokidar");
const liveServer = require("live-server");
const build = require("./build");

const params = {
  port: 8181, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "./public", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
};

liveServer.start(params);
console.log(`Live Server started on http://localhost:${params.port}`);

const srcFolder = "./src";

console.log(`Watching for file changes in: ${srcFolder}`);

const watcher = chokidar.watch(srcFolder, {
  persistent: true,
  ignoreInitial: false,
});

const buildChanges = async () => {
  console.log("Re building...");
  build();
  console.log("Re building done!");
};

watcher
  .on("add", (path) => console.log(`File ${path} has been added`))
  .on("addDir", (path) => console.log(`Directory ${path} has been added`))
  .on("change", (path) => {
    console.log(`File ${path} has been changed`);
    buildChanges();
  })
  .on("unlink", (path) => console.log(`File ${path} has been removed`))
  .on("unlinkDir", (path) => console.log(`Directory ${path} has been removed`))
  .on("ready", () => console.log("Chokidar is ready to watch for changes!"))
  .on("error", (error) => console.error(`Watcher error: ${error}`));
