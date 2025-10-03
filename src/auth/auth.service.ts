import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  //constructor
  constructor(private usersService:UsersService,private jwtService: JwtService) {}
  
  async register(email:string,password:string,displayName?:string){ 
    try {
    const existing: any = await this.usersService.findByEmail(email);

    if (existing) {
  return  { status: HttpStatus.BAD_REQUEST, message: 'User already exists' }
      }

    
    // console.log(existing.otp.fdvjcvkvc);
    const hashed = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      password: hashed,
      displayName,
    });

    const payload = { sub: user.id, email: user.email,displayName:user.displayName };

    return { accessToken: this.jwtService.sign(payload) };
  } catch (error) {
    console.error('Error in register:', error);

    if (error instanceof HttpException) {
      throw error; 
    }

    return  { status: HttpStatus.BAD_REQUEST, message: 'Undefined value' }
  }
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user =await this.usersService.findByEmail(email);
    if(!user){
      return null;
    }
    const matched = await bcrypt.compare(pass,user.password);
    if(matched){
      return user;
    }
    return null;
  }
  async login(user:any) {
    const payload = { sub: user.id, email: user.email, displayName:user.displayName};
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }  
}
