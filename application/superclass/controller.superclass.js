import ImporterSuperclass from './importer.superclass'

import * as services from '../../src/services'

export class ControllerSuperclass extends ImporterSuperclass {
	constructor ({ req, res }) {
		super()
		this.initializeData(req, res)
		this.linkServices()
	}

	initializeData (req, res) {
		this.payload = {}
		this.body = req.body || {}
		this.params = req.params || {}
		this.headers = req.headers || {}
		this.req = req
		this.res = res
	}

	linkServices () {
		this.s = services
	}

	validator () {
		return true
	}
}
