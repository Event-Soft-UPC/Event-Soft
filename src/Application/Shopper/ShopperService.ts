import { ShopperRepository } from "../../Domain/Shopper/ShopperRepository";
import { Identifier } from "../../Domain/Shared/Identifier";


export class ShopperService{
    private readonly shopperRepository:ShopperRepository
    
    constructor(shopperRepository:ShopperRepository){
        this.shopperRepository  = shopperRepository
    }
    
    async getShopperWithTickets(shopperId:Identifier){
        return  await this.shopperRepository.findByIdAndPopulateTickets(shopperId)
    }

}