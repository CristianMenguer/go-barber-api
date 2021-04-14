import { Router, Request, Response } from 'express'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import { getRepository } from 'typeorm'
import multer from 'multer'
import uploadConfig from '@config/upload'

import User from '@modules/users/infra/typeorm/entities/User'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

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

        // @ts-ignore
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
        const updateAvatarService = new UpdateUserAvatarService()

        const user = await updateAvatarService.execute({
            user_id: request.user.id,
            filename: request.file.filename
        })

        // @ts-ignore
        delete user.password

        return response.json(user)
    }
)

export default userRoutes
