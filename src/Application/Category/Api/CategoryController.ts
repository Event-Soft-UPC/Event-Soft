import { Router, Request, Response } from "express";
import { categoryRepository } from "../../../ioc/container";
import { CategoryService } from "../Service/CategoryService";
import { upload, getMainPaths } from "../../Middleware/photosManager";
import { CategoryRegisterDTO } from "./CategoryDTO";
import { CREATED } from "http-status-codes";
import { handlerExceptions } from "../../Handler/AuthHandler";
import { CategoryRegisterValidator } from "./CategoryValidator";

const router = Router()
const categoryService = new CategoryService(categoryRepository)

router.post("/",upload,async(req: Request, res: Response)=>{
    try {
        const category = req.body as CategoryRegisterDTO
        category.image = getMainPaths(req.files as {
            [fieldname: string]: Express.Multer.File[]
        } )[0]
        const validator = new CategoryRegisterValidator(category)
        validator.validate()
        const categoryCreated = await categoryService.create(category.name,category.description,category.image)
        res.status(CREATED).send(categoryCreated)
    } catch (error) {
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})

router.get("/",async(req: Request, res: Response)=>{
    try {
        const categories = await categoryService.getAll()
        res.status(CREATED).send(categories)
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