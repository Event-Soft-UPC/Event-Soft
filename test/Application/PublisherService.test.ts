import "reflect-metadata"
import container, { TYPES } from "../../src/ioc/container"
import Publisher from "../../src/Data/Entity/Publisher"
import PublisherRepository from "../../src/Data/Repository/PublisherRepository";
import "ts-jest"
import { injectable } from "inversify";
import PublisherService from "../../src/Application/Services/PublisherService";
import DuplicatePropertyException from "../../src/Application/Services/Exception/DuplicatePropertyException";

@injectable()
class MockPublisherRepository implements PublisherRepository {

    save(publisher: Publisher): Promise<void> {
       return new Promise((resolve,reject)=>{
           resolve()
       })
    }
    findAll(): Promise<Publisher[]> {
        const _publishers:Publisher[] = [{DNI:"12345678",Email:"josemowa45321@gmail",Id:"UUID1",Name:"JoseLuis",Password:"HelloMoto"}]
        return new Promise((resolve,reject)=>{
            resolve(_publishers)
        })
    }
    findByDNI(dni: string): Promise<Publisher|null> {
        let _publisher:Publisher|null = null
        if (dni === "75393086"){
            _publisher= {DNI: "75393086",Email:"piton007@gmail.com",Id:"UUID2",Name:"Jose22",Password:"12344556"}            
            
        }
        return new Promise((resolve,reject)=>{
            resolve(_publisher)
        }) 
    }
    
}



describe("PublisherService Test",()=>{
    beforeAll(()=>{
        container.unbind(TYPES.PublisherRepository);
        container.bind<PublisherRepository>(TYPES.PublisherRepository).to(MockPublisherRepository)
    })
    test("Publisher with good credentials",async ()=>{
        const publisherService = container.get<PublisherService>(TYPES.PublisherService)
        
        await expect(publisherService.create({dni:"75395086",email:"josemowa45222@gmail.com",name:"Pepe",password:"123qwe4r"})).resolves.toBe(undefined)
    })
    test("Publisher with dni duplicated",async ()=>{
        expect.assertions(1)
        const publisherService = container.get<PublisherService>(TYPES.PublisherService)
        try {
            await publisherService.create({dni:"75393086",email:"josemowa45222@gmail.com",name:"Pepe",password:"contoso2019"})
        } catch (error) {
            expect(error).toBeInstanceOf(DuplicatePropertyException)
        }
    })
})