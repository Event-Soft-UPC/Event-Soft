import { Schema, Document, model } from "mongoose"
import { AuthUserSchema } from "./Schema"
import { AuthUserRepository } from "../../Domain/AuthUser/AuthUserRepository"
import { AuthUser } from "../../Domain/AuthUser/AuthUser"
import { Query } from "../../Shared/QueryBuilder"
import { domainToSchema, schemaToDomain } from "../../Shared/Mapper/AuthUserMapper"
import { injectable } from "inversify"


@injectable()
export class MongooseAuthRepository implements AuthUserRepository {
    async update(entity: AuthUser): Promise<void> {
        await UserModel.findOneAndUpdate({username:entity.username},domainToSchema(entity)).exec()
    }
    async findByIdOrNull(id: string): Promise<AuthUser | null> {
        const schema = await UserModel.findOne({ username: id }).exec()
        return (schema === null) ? null : schemaToDomain(schema)
    }
    async findAll(query?: Query<AuthUser> | undefined): Promise<AuthUser[]> {
        const _query = UserModel.find()
        query?.where.forEach((v) => {
            if (!!v.eq)
                _query.where(v.property).equals(v.eq)
            if (!!v.range)
                _query.where(v.property).gt(v.range.lower).lt(v.range.upper)
        })
        const schemas = await _query.exec()
        return schemas.map(v => schemaToDomain(v))
    }
    async findOneOrNull(query: Query<AuthUser>): Promise<AuthUser | null> {
        const _query = UserModel.findOne()
        query?.where.forEach((v) => {
            if (!!v.eq)
                _query.where(v.property).equals(v.eq)
            if (!!v.range)
                _query.where(v.property).gt(v.range.lower).lt(v.range.upper)
        })
        const schema = await _query.exec()
        return (schema === null) ? null : schemaToDomain(schema)
    }
    async delete(entity: AuthUser): Promise<void> {
        await UserModel.deleteOne({username:entity.username}).exec()
    }

    async save(entity: AuthUser): Promise<void> {
        const schema = domainToSchema(entity)
        const userDocument = new UserModel(schema)
        await userDocument.save()
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
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    roles: {
        type: [String]
    }
})

export type UserDocument = AuthUserSchema & Document

const UserModel = model<UserDocument>("User", authUserSchema)
