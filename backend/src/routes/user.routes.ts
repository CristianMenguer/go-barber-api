import { Router, Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import { getRepository, getCustomRepository } from 'typeorm'

import User from '../models/User'

const userRoutes = Router()

userRoutes.post('/', async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({
            name,
            email,
            password
        })

        delete user.password

        return response.json(user)
    } catch (err) {
        return response.status(409).json({ error: err.message })
    }
})

userRoutes.get('/', async (request: Request, response: Response) => {
    const userRepository = getRepository(User)
    const users = await userRepository.find()

    return response.json(users)
})

export default userRoutes
