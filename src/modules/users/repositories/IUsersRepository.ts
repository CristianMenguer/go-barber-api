import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '@modules/users/infra/typeorm/entities/User'

export default interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>
    findByEmail(email: string): Promise<User | undefined>
    findById(id: string): Promise<User | undefined>
    save(user: User): Promise<User | undefined>
}
