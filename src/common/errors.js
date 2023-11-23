//-----External modules-----//
import {StatusCodes} from "http-status-codes";

export class UnauthorizedError extends Error{
     status=StatusCodes.UNAUTHORIZED;
}

export class ForbiddenError extends Error{
     status=StatusCodes.FORBIDDEN;
}

export class NotFoundError extends Error{
     status=StatusCodes.NOT_FOUND;
}

export class NotAllowedMethodError extends Error{
     status=StatusCodes.METHOD_NOT_ALLOWED;
}

export class ConflictError extends Error{
     status=StatusCodes.CONFLICT;
}

export class BadRequestError extends Error{
     status=StatusCodes.BAD_REQUEST;
}