import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface RequestDTO {
    email: string
    password: string
}

interface ResponseDTO {
    user: User
    token: string
}

class AuthenticateUserService {
    public async execute({
        email,
        password
    }: RequestDTO): Promise<ResponseDTO> {
        const userRepository = getRepository(User)

        const userByEmail = await userRepository.findOne({ where: { email } })

        if (!userByEmail) {
            throw new AppError('Incorrect email/password combination!', 401)
        }

        const passwordMatched = await compare(password, userByEmail.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination!', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: userByEmail.id,
            expiresIn
        })

        return {
            user: userByEmail,
            token
        }
    }
}

export default AuthenticateUserService
