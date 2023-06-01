import ImporterSuperclass from './importer.superclass'

export class ModelSuperclass extends ImporterSuperclass {
	constructor (table) {
		super()
		this.table = table
	}

	knex () {
		return this.h.knex.getInstance()(this.table)
	}

	getFirstWhere (where) {
		return this.knex()
			.select('*')
			.where(where)
			.first()
	}

	async add (entry) {
		await this.knex().insert(entry)
		return entry
	}
}
