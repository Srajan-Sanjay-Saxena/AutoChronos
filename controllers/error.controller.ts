import type { Response, Request, NextFunction } from "express";
import type { ResData } from "../Types/extras.types.js";

import { ApiError } from "../Utils/apiError.js";
import { env } from "../newProcess.js";
import { BaseResponseClass } from "../Helpers/base.class.js";
/**
 * Handles error responses in the development environment. 
 * Sends detailed error information including the stack trace.
 *
 * @param {ApiError<TObj>} err - The error object.
 * @param {Response} res - The Express response object.
 */
const sendDevError = <TObj extends ResData>(
  err: ApiError<TObj>,
  res: Response
) => {
  if (res.headersSent) return;

  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    ...err.data,
    stack: err.stack,
    cause: err.cause,
  });
};
/**
 * Handles error responses in the production environment.
 * Sends generic error messages for operational errors and hides sensitive stack traces.
 *
 * @param {ApiError<TObj>} err - The error object.
 * @param {Response} res - The Express response object.
 */
const sendProdError = <TObj extends ResData>(
  err: ApiError<TObj>,
  res: Response
) => {
  if (res.headersSent) return;
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      ...err.data,
    });
  } else {
    return res.status(500).json({
      status: 500,
      message: "Some internal error occurred",
      data: "",
    });
  }
};
/**
 * Handles Bad Request errors (HTTP 400).
 * This class builds a BadRequest error response and sends it to the client.
 */
export class BadRequest<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiError<TObj>
> {
  constructor() {
    super(ApiError);
  }/**
   * Builds and handles the BadRequest error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(400)
      .setMessage("Bad request .")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Handles Not Found errors (HTTP 404).
 * This class builds a NotFound error response and sends it to the client.
 */

export class NotFound<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiError<TObj>
> {
  constructor() {
    super(ApiError);
  }
  /**
   * Builds and handles the NotFound error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(404)
      .setMessage("Sorry request not found.")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
   * Builds and handles the NotFound error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created error response.
   */
export class ForbiddenErrorResponse<
  TObj extends ResData
> extends BaseResponseClass<TObj, ApiError<TObj>> {
  constructor() {
    super(ApiError);
  }
   /**
   * Builds and handles the Forbidden error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(403)
      .setMessage("Sorry you don't have permission to visit this page.")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Handles Unauthorized Access errors (HTTP 401).
 * This class builds an Unauthorized Access error response and sends it to the client.
 */
export class UnauthorizedAccess<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiError<TObj>
> {
  constructor() {
    super(ApiError);
  }
    /**
   * Builds and handles the Unauthorized Access error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(401)
      .setMessage("Sorry you haven't authenticated .")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Handles Internal Server errors (HTTP 500).
 * This class builds an Internal Server error response and sends it to the client.
 */
export class InternalServerError<
  TObj extends ResData
> extends BaseResponseClass<TObj, ApiError<TObj>> {
  constructor() {
    super(ApiError);
  }
  /**
   * Builds and handles the Internal Server error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(500)
      .setMessage("Some server error occurred.")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Handles Validation errors (HTTP 400).
 * This class builds a Validation error response and sends it to the client.
 */
export class ValidationError<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiError<TObj>
> {
  constructor() {
    super(ApiError);
  }
   /**
   * Builds and handles the Validation error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(500)
      .setMessage("Validation error occurred. Invalid fields given")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Handles Redirection responses (HTTP 302).
 * This class builds a Redirection response and sends it to the client.
 */
export class RedirectionResponse<
  TObj extends ResData
> extends BaseResponseClass<TObj, ApiError<TObj>> {
  constructor() {
    super(ApiError);
  }
   /**
   * Builds and handles the Redirection response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created redirection response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(302)
      .setMessage("Redirection")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Handles generic case errors (HTTP 500).
 * This class builds a CaseError response and sends it to the client.
 */
export class CaseError<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiError<TObj>
> {
  constructor() {
    super(ApiError);
  }
   /**
   * Builds and handles the CaseError response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created case error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(500)
      .setMessage("Sorry some internal error occurred , failed to fetch !")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Handles Duplicate errors (HTTP 409).
 * This class builds a Duplicate error response and sends it to the client.
 */
export class DuplicateError<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiError<TObj>
> {
  constructor() {
    super(ApiError);
  }
  /**
   * Builds and handles the Duplicate error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created duplicate error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(409)
      .setMessage(
        "Data with current credential already exist. Try creating different !"
      )
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Handles errors related to token deletion (HTTP 400).
 * This class builds a TokenDeletedError response and sends it to the client.
 */
export class TokenDeletedError<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiError<TObj>
> {
  constructor() {
    super(ApiError);
  }
   /**
   * Builds and handles the TokenDeletedError response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created token deleted error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(400)
      .setMessage("Token deleted , Login again !!")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}

/**
 * Handles JSON Web Token errors (HTTP 400).
 * This class builds a JSONWebTokenError response and sends it to the client.
 */
export class JSONWebTokenError<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiError<TObj>
> {
  constructor() {
    super(ApiError);
  }

  /**
   * Builds and handles the JSONWebTokenError response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created JWT error response.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    const error = this.builderInstance
      .setStatus(400)
      .setMessage("Current token was signed with different signature , try signing in again")
      .setData(data as TObj)
      .build(res);
    return error as ApiError<TObj>;
  }
}
/**
 * Global error handling middleware for the application.
 * Handles different types of errors based on the error stack trace or code.
 *
 * @param {ApiError<TObj>} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const globalErrorHandlingMiddleware = <TObj extends ResData>(
  err: ApiError<TObj>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Some internal server error occurred.";

  if ((err as any).code === 11000) {
    err = new DuplicateError().handleResponse(res, {
      info: "Current data already exist , try creating different",
    }) as ApiError<TObj>;
  }
  if (err.stack?.startsWith("ValidationError")) {
    err = new ValidationError().handleResponse(res, {
      info: "Provide some valid fields",
    }) as ApiError<TObj>;
  }
  if (err.stack?.startsWith("CastError")) {
    err = new ValidationError().handleResponse(res, {
      info: "Unable to fetch the data",
    }) as ApiError<TObj>;
  }
  if (err.stack?.startsWith("JsonWebTokenError")) {
    err = new JSONWebTokenError().handleResponse(res, {
      info: "Invalid token associated with user",
    }) as ApiError<TObj>;
  }
  if (env.NODE_ENV === "production") {
    sendProdError<TObj>(err, res);
  } else {
    sendDevError<TObj>(err, res);
  }
};
