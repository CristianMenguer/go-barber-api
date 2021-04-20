import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import UsersController from '@modules/users/infra/http/controllers/UsersController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

// import User from '@modules/users/infra/typeorm/entities/User'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const userRoutes = Router()
const upload = multer(uploadConfig)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRoutes.post('/', usersController.create)

// userRoutes.get('/', async (request: Request, response: Response) => {
//     const userRepository = getRepository(User)
//     const users = await userRepository.find()

//     return response.json(users)
// })

userRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update
)

export default userRoutes
