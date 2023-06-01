import { v1 as uuidv1 } from 'uuid'
import bcrypt from 'bcrypt'

export const

	uuid = uuidv1,

	passwordHash = async (password) => {
		const hashedPassword = await bcrypt.hash(password, 12)
		return hashedPassword
	},
	passwordCompare = async (pwdToCompare, pwdEncrypted) => {
		const comparedResult = await bcrypt.compare(pwdToCompare, pwdEncrypted)
		return comparedResult
	}
