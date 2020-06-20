import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

class AppointmentRepository {
    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    public create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date)

        this.appointments.push(appointment)

        return appointment
    }

    public findByDate(date: Date): Appointment | null {
        const appointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date)
        )

        return appointment || null
    }

    public all(): Appointment[] {
        return this.appointments
    }
}

export default AppointmentRepository
