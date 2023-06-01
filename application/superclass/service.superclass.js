import * as models from '../../src/models'
import * as services from '../../src/services'
import ImporterSuperclass from './importer.superclass'

export class ServiceSuperclass extends ImporterSuperclass {
	constructor () {
		super()
		this.linkModels()
		this.linkServices()
	}

	linkServices () {
		this.s = services
	}

	linkModels () {
		this.m = models
	}
}
