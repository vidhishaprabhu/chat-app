import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private messagerepo:Repository<Message>,
              @InjectRepository(Room) private roomrepo:Repository<Room>,
              @InjectRepository(User) private userrepo:Repository<User>,
  private eventGateway:EventsGateway){}
  async create(content: string, senderId: number, roomId: number) {
  const message = this.messagerepo.create({
    content,
    sender: { id: senderId } as User,
    room: { id: roomId } as Room,
  });

  const savedMessage = await this.messagerepo.save(message);
  this.eventGateway.sendMessage(savedMessage);
  return savedMessage;
}



  findAll() {
    return this.messagerepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
