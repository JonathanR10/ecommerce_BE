import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './DTO/CreateUser.dto';
import { UpdateUserDto } from './DTO/UpdateUser.dto';
import { allUsers } from 'src/utils/usersData';
import * as bcrypt from 'bcrypt';

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

    return `Usuario con ${foundUser.id} ha sido dado de baja`;
  }

  async addAllUsers(): Promise<string> {
    await Promise.all(
      allUsers.map(async (elem) => {
        const newUser = new Users();
        newUser.name = elem.name;
        newUser.email = elem.email;
        newUser.address = elem.address;
        newUser.phone = elem.phone;
        newUser.country = elem.country;
        newUser.city = elem.city;
        const hashedPassword = await bcrypt.hash(elem.password, 10);
        newUser.password = hashedPassword;

        await this.ormUsersRepository
          .createQueryBuilder()
          .insert()
          .into(Users)
          .values(newUser)
          .orIgnore()
          .execute();
      }),
    );
    return 'Usuarios agregados';
  }
}
