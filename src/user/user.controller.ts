import { BadRequestException, Body, ClassSerializerInterceptor, 
  Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, 
  UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { HasPermission } from 'src/permission/has-Permission.decorator';

@Controller("users")
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private userService: UserService,private authService:AuthService){};

    @Get()
    @HasPermission('users')
    async all(@Query('page') page=1){

        return this.userService.paginate(page,['role']);
    }
  @Post()
  @HasPermission('users')
  async create(@Body() body:UserCreateDto):Promise<User>{
    const password = await bcrypt.hash('1234',12)
    return this.userService.create({
        first_name: body.first_name,
        last_name:body.last_name,
        email:body.email,
        password,
        role:{id:body.role_id}
    })
  }
  @Get(':id')
  @HasPermission('users')
  async get(@Param('id') id:number){
    return this.userService.findById(id,['role'])
  }

  

  @Put("info")
   async updateInfo(@Body() body:UserUpdateDto, @Req() request:Request){
   // console.log(request)
    //console.log(body)
        const id = await this.authService.userId(request);

        await this.userService.update(id, body);

        return this.userService.findById(id);
    }
  @Put("password")
    async updatePassword(@Body('password') password:string,
    @Body('password_confirm') password_confirm:string, 
    @Req() request:Request){
      console.log(password),
      console.log(password_confirm)
        const id = await this.authService.userId(request);
        if(password!==password_confirm){
            throw new BadRequestException("Passwords are not matching, please fix it")
        }
        const hashed = await bcrypt.hash(password,12)
        await this.userService.update2(id, {password:hashed});
        return this.userService.findById(id);
    }
  @Put(':id')
  @HasPermission('users')
  async update(@Param('id') id:number, @Body() body:UserUpdateDto){ 
    console.log(id)
    const {role_id, ...data} = body
    await this.userService.update(id,{...data,role_id});
    return this.userService.findById(id);
  }
  @Delete(':id')
  @HasPermission('users')
  async delete(@Param('id') id:number){
      await this.userService.delete(id);
  }
}
