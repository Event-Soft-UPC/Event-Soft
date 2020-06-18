import { Query } from "../../Shared/QueryBuilder";

export interface BaseRepository<T,I> {
    save(entity:T):Promise<void>
    update(entity:T):Promise<void>
    findByIdOrNull(id:I):Promise<T|null>
    findAll(query?:Query<T>):Promise<T[]>
    findOneOrNull(query:Query<T>):Promise<T|null>
    delete(entity:T):Promise<void>
}