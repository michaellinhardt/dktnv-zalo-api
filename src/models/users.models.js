import { ModelSuperclass } from '../../application/superclass/model.superclass.js'

export class UsersModel extends ModelSuperclass {

	getByUsername (username) {
		return this.getFirstWhere({ username })
	}

	async addUser (userEntry) {
		await this.knex().insert(userEntry)
		return userEntry
	}
}
