import { ModelSuperclass } from '../../application/superclass/model.superclass.js'

export class UsersModel extends ModelSuperclass {

	getByUsername (username) {
		return this.getFirstWhere({ username })
	}

	async addUser (username, password) {
		const encryptedPassword = this.h.encryption.passwordHash(password)

		const userEntry = {
			uuid: this.h.encryption.uuid(),
			username,
			password: encryptedPassword,
		}

		await this.knex().insert(userEntry)
		return userEntry
	}
}
