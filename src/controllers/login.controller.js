import { ControllerSuperclass } from '../../application/superclass/controller.superclass'

export const LoginController

= [[{ POST: '/login', PUBLIC }, class extends ControllerSuperclass {
	validator () {
		const { body, h } = this

		h.ajv.validate('PostLoginSchema', body)
		h.ajv.validate('UsernamePattern', body)
		h.ajv.validate('PasswordPattern', body)
	}
	async handler () {
		const { s, body } = this
		const { username, password } = body

		const jwtoken = await s.users.loginAndGetJWToken(username, password)
		this.payload = { jwtoken }
		return this.renders.created()
	}
}]]
