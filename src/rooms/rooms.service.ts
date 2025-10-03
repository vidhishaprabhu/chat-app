import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomrepo:Repository<Room>,
  @InjectRepository(User) private userrepo:Repository<User>){}

  async create(name:string,senderId:number){
    const sender =await this.userrepo.findOne({where :{id:senderId}});
    if(!sender){
      throw new NotFoundException('Sender Not Found');
    }
    const room = this.roomrepo.create({name,sender});
    return this.roomrepo.save(room);
  }
  

  findAll() {
    return this.roomrepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  

}
