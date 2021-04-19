import path from 'path'
import fs from 'fs'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

interface IRequestDTO {
    user_id: string
    filename: string
}

class UpdateUserAvatarService {
    constructor(private userRepository: IUsersRepository) {}

    public async execute({ user_id, filename }: IRequestDTO): Promise<User> {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar!',
                401
            )
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar
            )

            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath
            )

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = filename

        await this.userRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService
