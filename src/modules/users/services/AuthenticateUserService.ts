import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

interface IRequestDTO {
    email: string
    password: string
}

interface IResponseDTO {
    user: User
    token: string
}

class AuthenticateUserService {
    constructor(private userRepository: IUsersRepository) {}

    public async execute({
        email,
        password
    }: IRequestDTO): Promise<IResponseDTO> {
        const userByEmail = await this.userRepository.findByEmail(email)

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
