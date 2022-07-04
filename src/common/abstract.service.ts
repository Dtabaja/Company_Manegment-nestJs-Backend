import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from 'src/user/models/user-update.dto';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {
   protected constructor( protected readonly repository: Repository<any>,){}
    
    async all(relations = []): Promise<any[]>{
        
        return this.repository.find({relations});
    }

    async paginate(page=1,relations = []): Promise<PaginatedResult>{
        const take = 15;
        const [data, total] = await this.repository.findAndCount({
            take,
            skip:(page-1)*take,
            relations
        });
        return{
            data:data,
            meta:{
                total,
                page,
                last_page:Math.ceil(total/take)
            }
        }
    } 
    async create(data): Promise<any>{
        return this.repository.save(data)
    }

    async logIn(condition:string):Promise<any>{
        return this.repository.findOne({where:{email:condition}});
    }
    async findById(condition:number,relations=[]):Promise<any>{
        return this.repository.findOne({where:{id:condition},relations});
    }

   
    async update(id:number, data): Promise<any>{
        return this.repository.update(id,{
        first_name: data.first_name,
        last_name:data.last_name,
        email:data.email,
        role:{id:data.role_id}})
    }
     async update2(id: number, data): Promise<any> {
        return this.repository.update(id, data)
    }

    async delete(id:number): Promise<any>{
        return this.repository.delete(id)
    }
}
