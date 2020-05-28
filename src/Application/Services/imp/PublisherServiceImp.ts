import PublisherRepository from "../../../Data/Repository/PublisherRepository";
import  CreatePublisherDTO  from "../../DTO/CreatePublisherDTO";
import { mapToPublisherFromCreatePublisherDTO } from "../../Mapper/PublisherMapper";
import { inject, injectable, LazyServiceIdentifer } from "inversify";
import { TYPES } from "../../../ioc/container";
import PublisherService from "../PublisherService";
import DuplicatePropertyException from "../Exception/DuplicatePropertyException";


@injectable()
export default class PublisherServiceImp implements PublisherService {
    private repository:PublisherRepository

    public constructor(@inject(new LazyServiceIdentifer(()=> TYPES.PublisherRepository)) repository:PublisherRepository){
        this.repository = repository
    }

    async create(publisher:CreatePublisherDTO){
        const duplicate = await this.repository.findByDNI(publisher.dni)
        if (duplicate === null){
            const _publisher = await mapToPublisherFromCreatePublisherDTO(publisher)
            await this.repository.save(_publisher);
            
        }else{
            throw new DuplicatePropertyException("dni");
        }
        
       
    }
}