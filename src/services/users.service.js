import { ServiceSuperclass } from '../../application/superclass/service.superclass.js'

export class UsersService extends ServiceSuperclass {

	getByUsername (username) {
		return this.m.users.getByUsername(username)
	}

	async loginAndGetJWToken (username, password) {
		await this.isValidUsernamePassword(username, password)

		return 'fake JWT'
	}

	async isValidUsernamePassword (username, password) {
		const user = await this.getByUsername(username)
		if (!user)
			this.h.renders.notFound('username.notFound')

		const comparedPassword
			= await this.h.encryption.passwordCompare(password, user.password)
		if (!comparedPassword)
			this.h.renders.notFound('username.notFound')
	}

	async registraionValidation (username) {
		const isUsername = await this.getByUsername(username)
		if (isUsername)
			this.h.renders.conflict('username.conflict')
	}

	async addUser (username, password) {
		await this.registraionValidation(username)

		const encryptedPassword
			= await this.h.encryption.passwordHash(password)

		const userEntry = {
			uuid: this.h.encryption.uuid(),
			username,
			password: encryptedPassword,
		}
		return this.m.users.addUser(userEntry)
	}
}
