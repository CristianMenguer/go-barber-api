import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'
import { startOfHour } from 'date-fns'

interface RequestDTO {
    provider: string
    date: Date
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository

    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository
    }

    public execute({ provider, date }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date)

        const slotInUse = this.appointmentRepository.findByDate(appointmentDate)

        if (slotInUse) {
            throw Error('Slot has already been allocated!')
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate
        })

        return appointment
    }
}

export default CreateAppointmentService
