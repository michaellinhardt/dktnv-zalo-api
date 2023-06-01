import * as helpersApp from '../helpers'
import * as configApp from '../config'

import * as helpersProject from '../../src/helpers'
import * as configProject from '../../src/config'

export default class ImporterSuperclass {
	constructor () {
		this.h = {
			...helpersApp,
			...helpersProject,
		}
		this.c = {
			...configApp,
			...configProject,
		}
		this.renders = helpersApp.renders
	}
}
