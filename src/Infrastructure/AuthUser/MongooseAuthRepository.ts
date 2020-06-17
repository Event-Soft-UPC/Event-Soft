import { Schema, Document, model } from "mongoose"
import { AuthUserSchema } from "./Schema"
import { AuthUserRepository } from "../../Domain/AuthUser/AuthUserRepository"
import { AuthUser } from "../../Domain/AuthUser/AuthUser"
import { Identifier } from "../../Domain/Shared/Identifier"

export class MongooseAuthRepository implements AuthUserRepository{
    async save(entity: AuthUser): Promise<void> {
        const schema:AuthUserSchema = {
            email:entity.email,
            firstName:entity.name.firstName,
            lastName:entity.name.lastName,
            password:entity.password,
            refreshToken:entity.refreshToken,
            username:entity.username.id
        }
        const userDocument =  new UserModel(schema)
        await userDocument.save()        
    }
    update(entity: AuthUser): Promise<void> {
        throw new Error("Method not implemented.")
    }
    findById(id: Identifier): Promise<import("../../Domain/AuthUser/AuthUser").AuthUser> {
        throw new Error("Method not implemented.")
    }
    findAll(query?: any): Promise<import("../../Domain/AuthUser/AuthUser").AuthUser[]> {
        throw new Error("Method not implemented.")
    }
    findOne(query: any): Promise<import("../../Domain/AuthUser/AuthUser").AuthUser> {
        throw new Error("Method not implemented.")
    }
    findOneOrNull(query: any): Promise<import("../../Domain/AuthUser/AuthUser").AuthUser | null> {
        throw new Error("Method not implemented.")
    }
    async delete(entity: AuthUser): Promise<void> {
        await UserModel.remove({username:entity.username.id}).exec()
    }
    
}

const authUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true
    },
    refreshToken:{
        type:String,
        required:true
    }
})

export type UserDocument = AuthUserSchema & Document

const UserModel = model<UserDocument>("User", authUserSchema)
