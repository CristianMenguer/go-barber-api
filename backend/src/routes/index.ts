import { Router, Request, Response } from 'express'
import appointmentRoutes from './appointment.routes'

const routes = Router()

routes.use('/appointment', appointmentRoutes)

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hey 👍🏼'
    })
})

export default routes
