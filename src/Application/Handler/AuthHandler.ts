import { DomainException } from "../../Domain/Shared/DomainError"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status-codes"
import { ApiException } from "../Exception/InputException"

export function handlerExceptions(error: Error) {
    switch (error.constructor) {
        case DomainException:
            return {status: BAD_REQUEST, body: error.message}
        case ApiException:
            return {status: BAD_REQUEST , body: error.message}
        default:
            return {status: INTERNAL_SERVER_ERROR, body: error.message}
    }
}
