# Simple static site generator

## Folder structure

```
public/
src/
assets/
data/
pages/
partials/
layout.ejs
site.config.js
```

- public: where the generated site will be.
- src: the source of the site contents.
- src/assets: contains CSS, JS, images, etc.
- src/data: contains JSON data.
- src/pages: are the templates that will be rendered to HTML. The directory structure found here will be replicated in the resulting site.
- src/partials: contains our reusable partials.
- src/layout.ejs: contains the common page structure, with a special placeholder, where the contents of each page will be inserted.
- site.config.js: it just exports an object that will be available in the page templates.

```js
const projects = require("./src/data/projects"); // JSON data

module.exports = {
  site: {
    title: "NanoGen",
    description: "Micro Static Site Generator in Node.js",
    projects,
  },
};
```
