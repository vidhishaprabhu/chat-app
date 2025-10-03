import { Message } from "src/message/entities/message.entity";

export interface ServerToClientEvents{
  newMessage: (payload:Message)=>void;
}