import { PublisherSchema } from "../Schema/PublisherSchema";

export default class Publisher implements PublisherSchema {
    id: string = "";
    name: string = "";
    lastName: string = "";
    dni: string = "";
    email: string = "";
    password: string = "";
}
