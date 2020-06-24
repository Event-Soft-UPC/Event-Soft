import { Router, Request, Response } from "express";
import { categoryRepository } from "../../../ioc/container";
import { CategoryService } from "../Service/CategoryService";
import { upload } from "../../Middleware/photosManager";
import { RegisterCategoryRequest } from "./HttpRequest";
import { ImageException } from "../../Exception/InputException";
import { CREATED } from "http-status-codes";
import { handlerExceptions } from "../../Handler/AuthHandler";

const router = Router()
const categoryService = new CategoryService(categoryRepository)

router.post("/",upload,async(req: Request, res: Response)=>{
    try {
        const category = req.body as RegisterCategoryRequest
        if (req.files === undefined) throw new ImageException()        
        const photo = req.files as {
            [fieldname: string]: Express.Multer.File[]
        }
        category.image = photo.main[0].filename
        const categoryCreated = await categoryService.create(category.name,category.description,category.image)
        res.status(CREATED).send(categoryCreated)
    } catch (error) {
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})

router.get("/:name",upload,async(req: Request, res: Response)=>{
    try {
        const category = await categoryService.getByName(req.params.name)
        res.status(CREATED).send(category)
    } catch (error) {
        console.log(error)
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})

router.get("/:name/events",upload,async(req: Request, res: Response)=>{
    try {
        const category = await categoryService.getByNameWithEvents(req.params.name)
        res.status(CREATED).send(category)
    } catch (error) {
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})

export default router