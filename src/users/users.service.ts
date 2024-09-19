import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid'
import { hashSync as bcryptHashSync } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}


  async create(data:UserDto) {
    const userAlreadyRegistered = await this.findByUsername(data.username)
    if(userAlreadyRegistered) throw new ConflictException(`user ${data.username} already registered`)
      
    const dbUser = new UserEntity()
    dbUser.username = data.username
    dbUser.passwordHash = bcryptHashSync(data.password, 10)

    const { id, username } = await this.userRepository.save(dbUser)
    return { id, username }
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { username: username }
    })
    if(!userFound) return null
    return {
      id: userFound.id,
      password: userFound.passwordHash,
      username: userFound.username
    }
  }

}
