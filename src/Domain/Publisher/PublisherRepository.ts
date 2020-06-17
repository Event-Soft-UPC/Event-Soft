import {Publisher} from "./Publisher";
import { BaseRepository } from "../Shared/BaseRepository";
import { Identifier } from "../Shared/Identifier";

export default interface PublisherRepository extends BaseRepository<Publisher>{
    findByIdAndPopulateEvents(publisherId:Identifier):Promise<Publisher>
}