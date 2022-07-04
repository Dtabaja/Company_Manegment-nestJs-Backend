import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { Repository } from 'typeorm';
import { UserUpdateDto } from './models/user-update.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    ){
        super(userRepository);
    };

    
    async paginate(page=1, relations =[]): Promise<PaginatedResult>{
        
        const {data,meta} = await super.paginate(page,relations);
        // const take = 15;
        // const [users, total] = await this.userRepository.findAndCount({
        //     take,
        //     skip:(page-1)*take,
        // });
        return{
            data: data.map(user=>{const {password,...data} = user
                return data}),
            // users.map(user=>{const {password,...data} = user
            //     return data}),
                meta:meta
                // {
                //     total,
                //     page,
                //     last_page:Math.ceil(total/take)
                // }
            }
        } 
        // async all(): Promise<User[]>{
        //     return this.userRepository.find();
        // }
        // async create(data): Promise<User>{
    //     return this.userRepository.save(data)
    // }

    // async logIn(condition:string):Promise<User>{
    //     return this.userRepository.findOne({where:{email:condition}});
    // }
    // async findById(condition:number):Promise<User>{
    //     return this.userRepository.findOne({where:{id:condition}});
    // }
    // async update(id:number, data:UserUpdateDto): Promise<any>{
    //     return this.userRepository.update(id,{
    //     first_name: data.first_name,
    //     last_name:data.last_name,
    //     email:data.email,
    //     role:{id:data.role_id}})
    // }
    // async delete(id:number): Promise<any>{
    //     return this.userRepository.delete(id)
    // }
}
