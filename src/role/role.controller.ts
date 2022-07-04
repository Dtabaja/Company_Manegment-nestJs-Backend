import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HasPermission } from 'src/permission/has-Permission.decorator';

import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
constructor(private roleService: RoleService){}
  @Get()
  @HasPermission('roles')
  async all(){
    return this.roleService.all();
        }

  @Get(':id')
  @HasPermission('roles')
  async get(@Param('id') id:number){
    return this.roleService.findById(id,['permissions'])
  }

  @Post()
  @HasPermission('roles')
  async create(@Body('name') name:string,
   @Body('permissions') ids:number[]
   ){
    /* [1,2] => [{id:1},{id:2}] */

   return this.roleService.create({name,permissions:ids.map(id=>({id}))})
  }

  @Put(':id')
  async update(@Param('id') id:number, @Body() name:string,@Body('permissions') ids:number[]){ 
     
      const role = await this.roleService.findById(id);
      return this.roleService.create({...role,permissions:ids.map(id=>({id}))})
  }

  @Delete(':id')
  @HasPermission('roles')
  async delete(@Param('id') id:number){
//    console.log("heyeyyyyyyyyyyyy")
      await this.roleService.delete(id);
  }
}
