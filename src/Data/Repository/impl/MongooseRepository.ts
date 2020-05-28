
import { Model,Document,Schema,model } from "mongoose"
import PublisherRepository from "../PublisherRepository";
import Publisher from "../../Entity/Publisher";
import {injectable} from "inversify";

@injectable()
class MongoosePublisherRepository implements PublisherRepository{
    async findByDNI(dni: string): Promise<Publisher|null> {
        return await PublisherModel.findOne({DNI:dni}).exec();
    }

    async save(publisher: Publisher) {
        const _publisher = await PublisherModel.create({...publisher})
        await _publisher.save()
    }
    async findAll(): Promise<Publisher[]> {
       return await PublisherModel.find().exec()
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



interface PublisherDocument extends Publisher,Document{}


const PublisherModel = model<PublisherDocument,Model<PublisherDocument>>("Publisher",publisherSchema)

export {MongoosePublisherRepository }

