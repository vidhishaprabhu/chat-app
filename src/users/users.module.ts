import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Message } from 'src/message/entities/message.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Room,Message])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
