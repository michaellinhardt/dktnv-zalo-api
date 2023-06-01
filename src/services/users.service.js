import { ServiceSuperclass } from '../../application/superclass/service.superclass.js'

export class UsersService extends ServiceSuperclass {

	getByUsername (username) {
		return this.m.users.getByUsername({ username })
	}

	saveNewUser (username, encryptedPassword) {

		const userEntry = {
			user_uuid: this.h.encryption.uuid(),
			username,
			password: encryptedPassword,
		}
		return this.m.users.addUser(userEntry)
	}
}
