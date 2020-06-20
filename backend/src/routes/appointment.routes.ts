import { Router, Request, Response } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository'

const appointmentRoutes = Router()
const appointmentRepository = new AppointmentRepository()

appointmentRoutes.post('/', (request: Request, response: Response) => {
    const { provider, date } = request.body

    const parsedDate = startOfHour(parseISO(date))

    const slotInUse = appointmentRepository.findByDate(parsedDate)

    if (slotInUse) {
        return response
            .status(409)
            .json({ message: 'Slot has already been allocated!' })
    }

    const appointment = appointmentRepository.create(provider, parsedDate)

    return response.json(appointment)
})

appointmentRoutes.get('/', (request: Request, response: Response) => {
    const appointments = appointmentRepository.all()

    return response.json(appointments)
})

export default appointmentRoutes
