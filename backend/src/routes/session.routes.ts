import { Router, Request, Response } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionRoutes = Router()

sessionRoutes.post('/', async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body

        const authenticateUser = new AuthenticateUserService()

        const { user, token } = await authenticateUser.execute({
            email,
            password
        })

        delete user.password

        return response.json({ user, token })
    } catch (err) {
        return response.status(409).json({ error: err.message })
    }
})

export default sessionRoutes
