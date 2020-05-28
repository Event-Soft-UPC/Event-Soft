import CreatePublisherDTO from "../DTO/CreatePublisherDTO";

export default interface PublisherService {
    create(publisher:CreatePublisherDTO):Promise<void>
}