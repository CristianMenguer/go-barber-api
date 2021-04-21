import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository()
        const createAppointmentService = new CreateAppointmentService(
            fakeAppointmentsRepository
        )

        const date = new Date()
        const provider_id = '12'
        const appointment = await createAppointmentService.execute({
            date,
            provider_id
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe(provider_id)
    })

    // it('should not be able to create two appointment at the same time', () => {
    //     expect(3).toBe(3)
    // })
})
