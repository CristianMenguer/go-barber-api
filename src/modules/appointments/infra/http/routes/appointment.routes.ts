import { Router, Request, Response } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentRoutes = Router()

appointmentRoutes.use(ensureAuthenticated)

appointmentRoutes.post('/', async (request: Request, response: Response) => {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate
    })

    return response.json(appointment)
})

appointmentRoutes.get('/', async (request: Request, response: Response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository)
    const appointments = await appointmentRepository.find()

    return response.json(appointments)
})

export default appointmentRoutes
