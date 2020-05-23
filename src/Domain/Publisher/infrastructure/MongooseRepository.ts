
import { Model,Document,Schema,model } from "mongoose"
import PublisherRepository from "../domain/PublisherRepository";
import Publisher from "../domain/Publisher";

export default class MongoosePublisherRepository implements PublisherRepository{

    async save(publisher: Publisher): Promise<void> {
        const _publisher = publisher as PublisherDocument
       await _publisher.save() 
    }
    async findAll(): Promise<Publisher[]> {
       return await PublisherMongoose.find()
    }
}


const publisherSchema = new Schema({
    Id: {
        type: String,
        required: true,
        unique: true,
    },
    Name: {
        type: String,
        required: true,
        trim:true
    },
    DNI: {
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    Email: {
        type: String,
        trim: true,
        required:true
    },
    Password: {
        type: String,
        required:true
    }
})

type PublisherDocument = Document & Publisher;

const PublisherMongoose = model<PublisherDocument,Model<PublisherDocument>>("Publisher",publisherSchema)


