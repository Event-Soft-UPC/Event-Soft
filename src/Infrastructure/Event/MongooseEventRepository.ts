import { Schema, Document, model } from "mongoose"
import { EventSchema } from "./Schema"
import { EventRepository } from "../../Domain/Event/EventRepository"
import { Event } from "../../Domain/Event/Event"
import { Query } from "../../Shared/QueryBuilder"
import { domainToSchema, schemaToDomain } from "../../Shared/Mapper/EventMapper"
import { EventNotFoundException } from "../../Domain/Shared/DomainError"
import { injectable } from "inversify"

@injectable()
export class MongooseEventRepository implements EventRepository{
    async save(entity: Event): Promise<void> {
        const schema = domainToSchema(entity)
        const userDocument = new EventModel({...schema})
        await userDocument.save()
    }
    async update(entity: Event): Promise<void> {
        await EventModel.findOneAndUpdate({eventId:entity.id},domainToSchema(entity)).exec()
    }
    async findAll(query?:Query<Event> | undefined): Promise<Event[]> {
        const _query = EventModel.find()
        query?.where.forEach((v) => {
            if (!!v.eq)
                _query.where(v.property).equals(v.eq)
            if (!!v.range)
                _query.where(v.property).gt(v.range.lower).lt(v.range.upper)
        })
        const schemas = await _query.exec()
        return schemas.map(v => schemaToDomain(v))
    }
    async findOneOrNull(query: Query<Event>): Promise<Event | null> {
        const _query = EventModel.findOne()
        query?.where.forEach((v) => {
            if (!!v.eq)
                _query.where(v.property).equals(v.eq)
            if (!!v.range)
                _query.where(v.property).gt(v.range.lower).lt(v.range.upper)
        })
        const schema = await _query.exec()
        return (schema === null) ? null : schemaToDomain(schema)
    }
    async delete(entity: Event): Promise<void> {
        await EventModel.deleteOne({eventId:entity.id}).exec()
    }
    async findById(id: string): Promise<Event> {
        const schema = await EventModel.findOne({ eventId: id }).exec()
        if (schema === null)
            throw new EventNotFoundException()
        return schemaToDomain(schema) 
    }
    
}


const zoneSchema = new Schema({
    count:Number,
    name:String,
    price:{
        cost:Number,
        currency:String
    }
})

const eventSchema = new Schema({
    eventId: {
        type:String,
        required:true,
        index:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    referenceLocation:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    zones:[zoneSchema],
    categoriesId:{
        type:[String]
    }
})

export type EventDocument = EventSchema & Document

const EventModel = model<EventDocument>("Event", eventSchema)

