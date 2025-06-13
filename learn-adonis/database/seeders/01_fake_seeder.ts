import { movies } from '#database/data/movies'
import { CineastFactory } from '#database/factories/cineast_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { UserFactory } from '#database/factories/user_factory'
import MovieStatuses from '#enums/movie_statuses'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment: string[] = ['development', 'testing']
  async run() {
    // Write your database queries inside the run method

    await CineastFactory.createMany(10)
    await UserFactory.with('profile').createMany(10)

    await this.#createMovies()
  }

  async #createMovies() {
    let i = 0
    await MovieFactory.tap((row, { faker }) => {
      const released = DateTime.now().set({ year: movies[i].releaseYear })

      row.title = movies[i].title
      row.statusId = MovieStatuses.RELEASED

      row.releasedAt = DateTime.fromJSDate(
        faker.date.between({
          from: released.startOf('year').toJSDate(),
          to: released.endOf('year').toJSDate(),
        })
      )

      i++
    }).createMany(movies.length)

    await MovieFactory.createMany(4)
    await MovieFactory.apply('released').createMany(2)
    await MovieFactory.apply('postProduction').createMany(2)
    await MovieFactory.apply('releasingSoon').createMany(2)
  }
}
