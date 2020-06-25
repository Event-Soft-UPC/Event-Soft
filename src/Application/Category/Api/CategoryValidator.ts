import { BaseValidator, validateMaxLength, validateCategoryName, validateMainImages } from "../../Shared/BaseValidator";
import { CategoryRegisterDTO } from "./CategoryDTO";
import { InputException } from "../../Exception/InputException";

export const MAX_CATEGORY_DESCRIPTION_LENGTH = 255

export class CategoryRegisterValidator extends BaseValidator {
    readonly category:CategoryRegisterDTO

    constructor(category:CategoryRegisterDTO) {
        super()
        this.category = category
    }

    validate(): void {
        this.errors.push(...validateMaxLength("description",this.category.description,MAX_CATEGORY_DESCRIPTION_LENGTH))
        this.errors.push(...validateCategoryName(this.category.name))
        this.errors.push(...validateMainImages([this.category.image]))
        if (this.errors.length > 0)
            throw new InputException(this.errors)

    }

}


