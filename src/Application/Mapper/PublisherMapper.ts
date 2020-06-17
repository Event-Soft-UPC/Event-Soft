import  CreatePublisherDTO  from "../DTO/CreatePublisherDTO";
import Publisher from "../../Domain/Publisher/Publisher";
import {v1 as uuid} from "uuid" 
import  {hash} from "bcryptjs"

export async function mapToPublisherFromCreatePublisherDTO(publisher:CreatePublisherDTO):Promise<Publisher>{
    return new Publisher(uuid(),publisher.dni,publisher.email,publisher.name, await hash(publisher.password, 8) )
}