import { ControllerSuperclass } from '../../application/superclass/controller.superclass'

export const RegistrationController

= [[{ POST: '/registration', PUBLIC }, class extends ControllerSuperclass {
	validator () {
		const { body, h } = this

		h.ajv.validate('PostRegistrationSchema', body)
		h.ajv.validate('UsernamePattern', body)
		h.ajv.validate('PasswordPattern', body)
	}
	async handler () {
		const { s, body } = this
		const { username, password } = body

		await s.users.addUser(username, password)
		return this.renders.created()
	}
}]]
