import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('/create-room')
  create(@Body() createRoomDto: CreateRoomDto) {
    const {name,senderId} =createRoomDto;
    return this.roomsService.create(name,senderId);
  }

  @Get('/get-all-rooms')
  findAll() {
    return this.roomsService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

}
