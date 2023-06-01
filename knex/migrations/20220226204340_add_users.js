import { createTableDefaultSetup } from '../../application/helpers/knex.helper'

const tableName = 'users'

export const

	up = (knex) => {
		return knex.schema.createTable(tableName, table => {
			createTableDefaultSetup(knex, table)

			table.string('username').notNullable()
			table.string('password').notNullable()

		}).then(() => {
			const { users } = require('../seeds')
			return knex(tableName).insert(users)
		})
	},

	down = (knex) => {
		return knex.schema.dropTableIfExists(tableName)
	}
