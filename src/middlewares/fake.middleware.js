export const

	fakeAction = (req, res, next) => {
		console.debug('I am a fake middleware')

		if (res || req)
			return next()
	}
