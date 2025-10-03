
import { Message } from "src/message/entities/message.entity";
import { Room } from "src/rooms/entities/room.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('users')
export class User {
@PrimaryGeneratedColumn() id: number;


@Column({ unique: true })
email: string;


@Column() password: string; 


@Column({ nullable: true }) displayName?: string;


@CreateDateColumn() createdAt: Date;
@UpdateDateColumn() updatedAt: Date;

@OneToMany(() => Room, (room) => room.sender)
  rooms: Room[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
