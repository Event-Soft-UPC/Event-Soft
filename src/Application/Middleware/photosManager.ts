import multer from "multer"
import { MIN_MAIN_IMAGES, MIN_REFERENCES_IMAGES } from "../Shared/BaseValidator"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.PhotosFolder!)
    },

    filename: function (req: any, file: any, cb: any) {
        cb(null, Date.now() + file.originalname)
    },
})

const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true)
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false)
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
}).fields([
    { name: "main", maxCount: MIN_MAIN_IMAGES },
    { name: "references", maxCount: MIN_REFERENCES_IMAGES }
])
export function getMainPaths(files?:{ [fieldname: string]: Express.Multer.File[] }):string[]{
    return getPaths("main",files)
}

export function getReferencesPath(files?:{ [fieldname: string]: Express.Multer.File[] }):string[]{
    return getPaths("references",files)
}

function getPaths(type:string,files?:{ [fieldname: string]: Express.Multer.File[] }){
    const paths:string[] = []
    if (files === undefined)
    return paths
    if (!!files[type])
        paths.push(...files[type].map(v => v.filename))
    return paths
}

