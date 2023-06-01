process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import _ from 'lodash'

import * as controllers from '../src/controllers'
import * as middlewaresApp from './middlewares'
import setupProjectMiddlewares from '../src/middlewares'
import ImporterSuperclass from './superclass/importer.superclass'

const ExpressServer = new (class extends ImporterSuperclass {
	constructor () {
		super()
		this.setupInstance()
		this.setupMiddlewares()
		this.setupAllRoute()
		this.startListening()
	}

	setupInstance () {
		this.expressInstance = express()
		this.expressInstance.use(express.json())
		this.expressInstance.use(express.urlencoded({ extended: false }))
	}

	setupMiddlewares () {
		if (this.c[process.env.NODE_ENV].printHTTPResponse) {
			this.expressInstance.use('/', middlewaresApp.debug.printHTTPResponse)
		}

		setupProjectMiddlewares(this.expressInstance)
	}

	setupAllRoute () {
		this.router = express.Router()

		const setupE404ControllerLast = controllers.E404Controller[0]

		_.forEach(controllers, (arrayOfRoutes, controllerName) => {
			if (controllerName !== 'E404Controller')
				_.forEach(arrayOfRoutes, this.setupOneRoute.bind(this))
		})

		this.setupOneRoute(setupE404ControllerLast)

		this.expressInstance.use('/', this.router)
	}

	setupOneRoute (routeElementFromController) {
		const [routeParam, RouteController] = routeElementFromController
		const [routeMethod, routePath] = this.extractRouteMethodAndPath(routeParam)

		// The code below is executed when a user access this specific route
		this.router[routeMethod](routePath, async (req, res) => {
			const controller = new RouteController({ req, res })

			try {
				// later here, the middleware will add a boolean isAuthenticate
				// the if will be (!routeParam.PUBLIC && !req.isAuthenticate)
				if (!routeParam.PUBLIC)
					return this.h.renders.unauthorized('unauthorized')

				await controller.validator()
				await controller.handler()

			// We endup in the catch block, no matter what !
			// error will be either :
			// - AppRender (process ok)
			// - AppError (error related to request)
			// - Error (code error)
			} catch (error) {
				this.h.renders.catchErrorsOrRenders(res, error, controller.payload)
			}
		})
	}

	extractRouteMethodAndPath (routeParam) {
		if (routeParam.GET) return ['get', routeParam.GET]
		else if (routeParam.POST) return ['post', routeParam.POST]
		else if (routeParam.PUT) return ['put', routeParam.PUT]
		else if (routeParam.DEL) return ['delete', routeParam.DEL]
		else if (routeParam.PATCH) return ['patch', routeParam.PATCH]

		throw new Error('Route method should be GET, POST, PUT, PATCH or DEL')
	}

	startListening () {
		const { port } = this.c[process.env.NODE_ENV]
		this.expressInstance.listen(port, () =>
			process.stdout.write(`Server is running on port ${port}\r\n`))
	}

	getExpressInstance () {
		return this.expressInstance
	}

})()

export const expressInstance = ExpressServer.getExpressInstance()
