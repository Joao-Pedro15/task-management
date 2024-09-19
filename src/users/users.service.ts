import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid'
import { hashSync as bcryptHashSync } from 'bcrypt'

@Injectable()
export class UsersService {

  private readonly users: UserDto[] = []

  create(data:UserDto) {
    data.id = uuid()
    data.password = bcryptHashSync(data.password, 10)
    this.users.push(data)
  }

  findByUsername(username: string): UserDto | null {
    return this.users.find(user => user.username) ?? null
  }

}
