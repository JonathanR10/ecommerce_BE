import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './DTO/CreateUser.dto';
import { UpdateUserDto } from './DTO/UpdateUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly ormUsersRepository: Repository<Users>,
  ) {}

  async getAllUsers(page: number, limit: number): Promise<Users[]> {
    const skip = (page - 1) * limit;
    const allUsers = await this.ormUsersRepository.find({
      skip,
      take: limit,
    });

    return allUsers;
  }

  async getUserById(id: string): Promise<Users> {
    const foundUser = await this.ormUsersRepository.findOne({
      where: { id },
      relations: {
        orders: {
          orderDetails: {
            products: true,
          },
        },
      },
    });
    if (!foundUser)
      throw new NotFoundException(
        `No se encontró al usuario con el id = ${id}`,
      );

    return foundUser;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.ormUsersRepository.findOneBy({ email });
  }

  async addUser(newUser: CreateUserDto): Promise<Users> {
    return await this.ormUsersRepository.save(newUser);
  }

  async updateUser(id: string, userNewData: UpdateUserDto): Promise<Users> {
    const foundUser = await this.ormUsersRepository.findOneBy({ id });
    if (!foundUser)
      throw new NotFoundException(
        `No se encontró al usuario con el id = ${id}`,
      );
    const mergedUser = this.ormUsersRepository.merge(foundUser, userNewData);
    const savedUser = await this.ormUsersRepository.save(mergedUser);
    return savedUser;
  }

  async deleteuser(id: string) {
    const foundUser = await this.ormUsersRepository.findOneBy({ id });
    if (!foundUser)
      throw new NotFoundException(
        `No se encontró al usuario con el id = ${id}`,
      );

    foundUser.isActive = false;
    await this.ormUsersRepository.save(foundUser);

    return foundUser.id;
  }
}
