import { Event } from "../Event/Event";


export class Category {
    name:string
    description:string
    image:string
    private events:Event[] = []

    constructor(name:string,description:string,image:string){
        this.name = name;
        this.description = description
        this.image = image;
    }

    isEquals(category:Category){
        return this.name === category.name
    }
    
    setDescription(description:string){this.description = description;return this;}
    setImage(image:string){this.image = image;return this;}
    setName(name:string){this.name = name; return this}
    setEvents(events:Event[]){this.events = events;return this}
    getEvents(){return this.events}

}