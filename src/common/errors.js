//-----External modules-----//
import {StatusCodes} from "http-status-codes";

export class UnauthorizedError extends Error{
    readonly status=StatusCodes.UNAUTHORIZED;
}

export class ForbiddenError extends Error{
    readonly status=StatusCodes.FORBIDDEN;
}

export class NotFoundError extends Error{
    readonly status=StatusCodes.NOT_FOUND;
}

export class NotAllowedMethodError extends Error{
    readonly status=StatusCodes.METHOD_NOT_ALLOWED;
}

export class ConflictError extends Error{
    readonly status=StatusCodes.CONFLICT;
}

export class BadRequestError extends Error{
    readonly status=StatusCodes.BAD_REQUEST;
}