import { Router } from 'express'

import SessionsController from '@modules/users/infra/http/controllers/SessionsController'

const sessionRoutes = Router()
const sessionsController = new SessionsController()

sessionRoutes.post('/', sessionsController.create)

export default sessionRoutes
