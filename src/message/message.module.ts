import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { EventsModule } from 'src/events/events.module';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([Message,User,Room]),EventsModule],
  controllers: [MessageController],
  providers: [MessageService,EventsGateway],
  exports:[MessageService]
})
export class MessageModule {}
