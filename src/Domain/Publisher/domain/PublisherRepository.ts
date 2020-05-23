import Publisher from "./Publisher";

export default interface PublisherRepository{
    save(publisher:Publisher):Promise<void>
    findAll():Promise<Array<Publisher>>
}