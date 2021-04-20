import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController'

const appointmentRoutes = Router()
const appointmentController = new AppointmentController()

appointmentRoutes.use(ensureAuthenticated)

appointmentRoutes.post('/', appointmentController.create)

// appointmentRoutes.get('/', async (request: Request, response: Response) => {
//     const appointmentRepository = getCustomRepository(AppointmentRepository)
//     const appointments = await appointmentRepository.find()

//     return response.json(appointments)
// })

export default appointmentRoutes
