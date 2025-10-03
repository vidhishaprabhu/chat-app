import { Controller, Post, Body, Res, HttpStatus, UnauthorizedException,Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import  express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Res() res:express.Response,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('displayName') displayName?: string
  ) {
    const result = await this.authService.register(email, password, displayName);

    if (result.status && result.message) {
      return res.status(result.status).json(result);
    }
    return res.status(HttpStatus.CREATED).json(result);
  }


  @Post('/login')
async login(
  @Res() res:express.Response,
  @Body('email') email: string,
  @Body('password') password: string,
) {
  const user = await this.authService.validateUser(email, password);

  if (!user) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Email and Password does not registered' ,status:HttpStatus.BAD_REQUEST});
  }
  const result = await this.authService.login(user);
  return res.status(HttpStatus.OK).json(result);
}
@UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }


  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
