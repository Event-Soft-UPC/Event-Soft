import { Query } from "./QueryBuilder";
import { Identifier } from "./Identifier";

export interface BaseRepository<T> {
    save(entity:T):Promise<void>
    update(entity:T):Promise<void>
    findById(id:Identifier):Promise<T>
    findAll(query?:Query):Promise<T[]>
    findOne(query:Query):Promise<T>
    findOneOrNull(query:Query):Promise<T|null>
    delete(entity:T):Promise<void>
}