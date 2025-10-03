import { HttpException } from "@nestjs/common";

export class UndefinedException extends HttpException{
  constructor(message: string = 'Undefined value', status: number=400) {
    super(
      {
        status,   
        message,           
      },
      status,
    );
  }
}