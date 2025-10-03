import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name:string;
  @IsInt()
  @IsNotEmpty()
  senderId:number
}
