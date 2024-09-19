import { Module } from '@nestjs/common';
import { UsersController } from './UsersController';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])], // deixa disponivel essa entidade para o modulo
  exports: [UsersService],
  providers: [UsersService]
})
export class UsersModule {}
