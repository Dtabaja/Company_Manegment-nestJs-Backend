import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUpdateDto } from 'src/user/models/user-update.dto';
import { Repository } from 'typeorm';
import { RoleUpdateDto } from './user-update.dto';
import { Role } from './role.entity';
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class RoleService extends AbstractService {

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>

    ){
        super(roleRepository);
    }
   

    
    // async findById(condition:number):Promise<Role>{
    //     return this.roleRepository.findOne({where:{id:condition},relations:['permissions']});
    // }
    
}
