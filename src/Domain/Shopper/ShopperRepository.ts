import { BaseRepository } from "../Shared/BaseRepository";
import Shopper from "./Shopper";
import { Identifier } from "../Shared/Identifier";

export interface ShopperRepository extends BaseRepository<Shopper>{
    findByIdAndPopulateTickets(shopperId:Identifier):Promise<Shopper>
}