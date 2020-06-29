import { Router, Request, Response } from 'express'
import appointmentRoutes from './appointment.routes'
import userRoutes from './user.routes'
import sessionRoutes from './session.routes'

const routes = Router()

routes.use('/appointment', appointmentRoutes)
routes.use('/user', userRoutes)
routes.use('/session', sessionRoutes)

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hey 👍🏼'
    })
})

export default routes
