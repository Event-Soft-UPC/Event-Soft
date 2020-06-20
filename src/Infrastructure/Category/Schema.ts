import { EventSchema } from "../Event/Schema";

export interface CategorySchema{
    name:string,
    description:string,
    image:string,
    events:EventSchema[]
}