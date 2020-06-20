import { DomainException } from "../../Domain/Shared/DomainError"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "http-status-codes"
import { ApiException } from "../Exception/InputException"
import { SecurityException } from "../../Domain/Shared/TokenManager"

export function handlerExceptions(error: Error) {
    switch (Object.getPrototypeOf(Object.getPrototypeOf(error)).constructor) {
        case DomainException:
            return {status: BAD_REQUEST, body: error.message}
        case ApiException:
            return {status: BAD_REQUEST , body: error.message}
        case SecurityException:
            return {status: UNAUTHORIZED , body: error.message}
        default:
            return {status: INTERNAL_SERVER_ERROR, body: error.message}
    }
}
