import { hash } from 'bcryptjs'

import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'

interface IRequestDTO {
    name: string
    email: string
    password: string
}

class CreateUserService {
    constructor(private userRepository: IUsersRepository) {}

    public async execute({
        name,
        email,
        password
    }: ICreateUserDTO): Promise<User> {
        const userByEmail = await this.userRepository.findByEmail(email)

        if (userByEmail) {
            throw new AppError('Email address has already been registered!')
        }

        const hashedPassword = await hash(password, 8)

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return user
    }
}

export default CreateUserService
