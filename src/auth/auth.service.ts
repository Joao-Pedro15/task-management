import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds:number
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>("JWT_EXPIRATION_TIME")
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.userService.findByUsername(username)
    if(!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException()
    }

    const payload = { sub: foundUser.id, username: foundUser.username }
    const token = this.jwtService.sign(payload, { expiresIn: this.jwtExpirationTimeInSeconds })
    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds
    }

  }

}
