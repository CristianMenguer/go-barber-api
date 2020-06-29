import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../config/auth'

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
            throw Error('Incorrect email/password combination!')
        }

        const passwordMatched = await compare(password, userByEmail.password)

        if (!passwordMatched) {
            throw Error('Incorrect email/password combination!')
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
