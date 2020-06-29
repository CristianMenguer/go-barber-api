import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

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

        const token = sign({}, 'a22e0f955bd579b4e8507b0b83d47a9c', {
            subject: userByEmail.id,
            expiresIn: '1d'
        })

        return {
            user: userByEmail,
            token
        }
    }
}

export default AuthenticateUserService
