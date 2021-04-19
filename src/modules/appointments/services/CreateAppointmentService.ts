import { startOfHour } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppError from '@shared/errors/AppError'

interface IRequestDTO {
    provider_id: string
    date: Date
}

class CreateAppointmentService {
    constructor(private appointmentRepository: IAppointmentsRepository) {}

    public async execute({
        provider_id,
        date
    }: IRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date)

        const slotInUse = await this.appointmentRepository.findByDate(
            appointmentDate
        )

        if (slotInUse) {
            throw new AppError('Slot has already been allocated!')
        }

        const appointment = await this.appointmentRepository.create({
            provider_id,
            date: appointmentDate
        })

        return appointment
    }
}

export default CreateAppointmentService
