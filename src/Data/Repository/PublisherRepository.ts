import Publisher from "../Entity/Publisher";

export default interface PublisherRepository{
    save(publisher:Publisher):Promise<void>
    findAll():Promise<Array<Publisher>>
    findByDNI(dni:string):Promise<Publisher|null>
}