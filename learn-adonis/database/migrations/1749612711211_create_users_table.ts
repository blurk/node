import Roles from '#enums/roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('role_id').unsigned().references('roles.id').notNullable().defaultTo(Roles.USER)

      table.string('full_name').nullable()
      table.string('avatar_url').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').unique()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
