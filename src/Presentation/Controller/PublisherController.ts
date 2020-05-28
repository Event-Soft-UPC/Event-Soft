import PublisherService from "../../Application/Services/PublisherService";
import { HttpRequest, HttpResponse } from "../utils";
import CreatePublisherDTO from "../../Application/DTO/CreatePublisherDTO";
import { CreatePublisherValidator } from "../Validators/PublisherValidator";
import {Router,Request,Response} from "express";
import { OK,CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes'
import DuplicatePropertyException from "../../Application/Services/Exception/DuplicatePropertyException";


export  function publisherRouter (publisherController:PublisherController){
    const router= Router();
    router.post("/",async (req:Request,res:Response)=>{
        const response = await publisherController.create(req as HttpRequest)
        res.status(response.status).send(response.body)
    })
    return router;
}


export class PublisherController {
    private readonly publisherService:PublisherService;

    constructor(publisherService:PublisherService){
        this.publisherService = publisherService;
    }

    async create(req:HttpRequest):Promise<HttpResponse>{
        const resp:HttpResponse = {body:"", status:OK} ;
        try{
            const publisher = req.body as CreatePublisherDTO;
            const validator = new CreatePublisherValidator(publisher);
            validator.validate();
            if (validator.isValid())
            {
                await this.publisherService.create(publisher)
                resp.status = CREATED
                resp.body = "Publisher has been created"
            }
            else{
                resp.status = BAD_REQUEST
                resp.body = validator.errors
            }
        }
        catch(error) {
            if (error instanceof DuplicatePropertyException){
                resp.status = BAD_REQUEST
                resp.body = error.message
            }else{
                
                resp.status = INTERNAL_SERVER_ERROR
                resp.body = getStatusText(INTERNAL_SERVER_ERROR)
            }
        }
        return resp;
    }
}