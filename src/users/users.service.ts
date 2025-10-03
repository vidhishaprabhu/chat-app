import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo:Repository<User>
){}
  create(user:Partial<User>) {
    const u =this.repo.create(user);
    return this.repo.save(u);
  }
  findByEmail(email:string){
    return this.repo.findOne({ where: { email } });
  }
  findByPassword(password:string){
    return this.repo.findOne({ where: { password } });
  }
  findById(id){
    return this.repo.findOne(id);
  }
  // findAll() {
  //   return `This action returns all users`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
