import { Router, Request, Response } from 'express'

import appointmentRoutes from '@modules/appointments/infra/http/routes/appointment.routes'
import userRoutes from '@modules/users/infra/http/routes/user.routes'
import sessionRoutes from '@modules/users/infra/http/routes/session.routes'

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
