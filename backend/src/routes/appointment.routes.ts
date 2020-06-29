import { Router, Request, Response } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

const appointmentRoutes = Router()

appointmentRoutes.post('/', async (request: Request, response: Response) => {
    try {
        const { provider_id, date } = request.body

        const parsedDate = parseISO(date)

        const createAppointment = new CreateAppointmentService()

        const appointment = await createAppointment.execute({
            provider_id,
            date: parsedDate
        })

        return response.json(appointment)
    } catch (err) {
        return response.status(409).json({ error: err.message })
    }
})

appointmentRoutes.get('/', async (request: Request, response: Response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository)
    const appointments = await appointmentRepository.find()

    return response.json(appointments)
})

export default appointmentRoutes
