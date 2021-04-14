import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository'
import AppError from '@shared/errors/AppError'

interface RequestDTO {
    provider_id: string
    date: Date
}

class CreateAppointmentService {
    public async execute({
        provider_id,
        date
    }: RequestDTO): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const slotInUse = await appointmentRepository.findByDate(
            appointmentDate
        )

        if (slotInUse) {
            throw new AppError('Slot has already been allocated!')
        }

        const appointment = appointmentRepository.create({
            provider_id,
            date: appointmentDate
        })

        await appointmentRepository.save(appointment)

        return appointment
    }
}

export default CreateAppointmentService
