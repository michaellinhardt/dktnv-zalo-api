import Knex from 'knex'
import * as config from '../../src/config'

let knexInstance = null
const { knex: knexConfig, mysql } = config[process.env.NODE_ENV]

export const

	getInstance = () => {
		if (!knexInstance)
			knexInstance = Knex(knexConfig)

		return knexInstance
	},

	createTableDefaultSetup = (knex, table) => {

		table.charset(mysql.charset)
		table.collate(mysql.collate)

		table.increments('id').primary()
		table.string('uuid', 36).notNullable()

		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
		table.timestamp('updated_at')
			.defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
	}
