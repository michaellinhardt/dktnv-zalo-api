import { passwordHash } from '../application/helpers/encryption.helper'

// Check if password argument was passed
if (process.argv.length < 3) {
	console.log('Please provide a password to hash as an argument.')
	process.exit(1)
}

// Extract the password from command line arguments
const password = process.argv[2]

// Hash the password and log it
passwordHash(password).then(hashedPassword => {
	console.log(`Hashed password: ${hashedPassword}`)
}).catch(error => {
	console.error(`Error hashing password: ${error}`)
})
