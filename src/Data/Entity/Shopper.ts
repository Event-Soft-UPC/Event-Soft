import { ShopperSchema } from "../Schema/ShopperSchema";

export default class Shopper implements ShopperSchema{
    id: string = "";
    name: string = "";
    lastName: string = "";
    dni: string = "";
    email: string = "";
    password: string = "";
}