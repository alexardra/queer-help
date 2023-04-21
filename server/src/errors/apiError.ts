import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string = 'Something wrong happened.',
  ) {
    super(message);
  }
}

export class AuthError extends ApiError {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export class InternalError extends ApiError {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = ReasonPhrases.FORBIDDEN) {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message: string = ReasonPhrases.SERVICE_UNAVAILABLE) {
    super(StatusCodes.SERVICE_UNAVAILABLE, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = ReasonPhrases.CONFLICT) {
    super(StatusCodes.CONFLICT, message);
  }
}
