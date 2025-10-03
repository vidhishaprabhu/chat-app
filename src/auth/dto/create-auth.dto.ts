import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  content:string;
  @IsNumber()
  @IsNotEmpty()
  senderId:number;
  @IsInt()
  @IsNotEmpty()
  roomId:number;
}
