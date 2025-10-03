import { HttpException } from '@nestjs/common';

export class UserExistException extends HttpException {
  constructor(message: string = 'User already Exists', status: number=400) {
    super(
      {
        status,   
        message,           
      },
      status,
    );
  }
}
