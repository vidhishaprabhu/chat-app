import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { MessageService } from './message.service';


@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService,
              
  ) {}

  @Post('/create-message')
  async create(
    @Body('content') content: string,
    @Body('senderId') senderId: number,
    @Body('roomId') roomId: number,
  ) {
    const savedMessage = await this.messageService.create(content, senderId, roomId);   

    return savedMessage;
  }

  @Get('/get-all-messages')
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  
}
