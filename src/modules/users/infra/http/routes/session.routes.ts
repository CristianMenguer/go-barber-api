import { Router, Request, Response } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

const sessionRoutes = Router()

sessionRoutes.post('/', async (request: Request, response: Response) => {
    const { email, password } = request.body

    const usersRepository = new UsersRepository()
    const authenticateUser = new AuthenticateUserService(usersRepository)

    const { user, token } = await authenticateUser.execute({
        email,
        password
    })

    // @ts-ignore
    delete user.password

    return response.json({ user, token })
})

export default sessionRoutes
