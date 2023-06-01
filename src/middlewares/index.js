import * as fake from './fake.middleware'

export default function setupProjectMiddlewares (expressInstance) {
	expressInstance.use('/', fake.fakeAction)
}
