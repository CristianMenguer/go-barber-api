import { Router, Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import { getRepository, getCustomRepository } from 'typeorm'
import multer from 'multer'
import uploadConfig from '../config/upload'

import User from '../models/User'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRoutes = Router()

const upload = multer(uploadConfig)

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

userRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request: Request, response: Response) => {
        try {
            const updateAvatarService = new UpdateUserAvatarService()

            const user = await updateAvatarService.execute({
                user_id: request.user.id,
                filename: request.file.filename
            })

            delete user.password

            return response.json(user)
        } catch (err) {
            return response.status(409).json({ error: err.message })
        }

        return response.json({ ok: true })
    }
)

export default userRoutes
