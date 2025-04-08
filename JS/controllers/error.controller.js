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
const sendDevError = (err, res) => {
    if (res.headersSent)
        return;
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
const sendProdError = (err, res) => {
    if (res.headersSent)
        return;
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            ...err.data,
        });
    }
    else {
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
export class BadRequest extends BaseResponseClass {
    constructor() {
        super(ApiError);
    } /**
     * Builds and handles the BadRequest error response.
     *
     * @param {Response} res - The Express response object.
     * @param {TObj} data - Optional additional data to include in the response.
     * @returns {ApiError<TObj>} The created error response.
     */
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(400)
            .setMessage("Bad request .")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles Not Found errors (HTTP 404).
 * This class builds a NotFound error response and sends it to the client.
 */
export class NotFound extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(404)
            .setMessage("Sorry request not found.")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
   * Builds and handles the NotFound error response.
   *
   * @param {Response} res - The Express response object.
   * @param {TObj} data - Optional additional data to include in the response.
   * @returns {ApiError<TObj>} The created error response.
   */
export class ForbiddenErrorResponse extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(403)
            .setMessage("Sorry you don't have permission to visit this page.")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles Unauthorized Access errors (HTTP 401).
 * This class builds an Unauthorized Access error response and sends it to the client.
 */
export class UnauthorizedAccess extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(401)
            .setMessage("Sorry you haven't authenticated .")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles Internal Server errors (HTTP 500).
 * This class builds an Internal Server error response and sends it to the client.
 */
export class InternalServerError extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(500)
            .setMessage("Some server error occurred.")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles Validation errors (HTTP 400).
 * This class builds a Validation error response and sends it to the client.
 */
export class ValidationError extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(500)
            .setMessage("Validation error occurred. Invalid fields given")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles Redirection responses (HTTP 302).
 * This class builds a Redirection response and sends it to the client.
 */
export class RedirectionResponse extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(302)
            .setMessage("Redirection")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles generic case errors (HTTP 500).
 * This class builds a CaseError response and sends it to the client.
 */
export class CaseError extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(500)
            .setMessage("Sorry some internal error occurred , failed to fetch !")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles Duplicate errors (HTTP 409).
 * This class builds a Duplicate error response and sends it to the client.
 */
export class DuplicateError extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(409)
            .setMessage("Data with current credential already exist. Try creating different !")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles errors related to token deletion (HTTP 400).
 * This class builds a TokenDeletedError response and sends it to the client.
 */
export class TokenDeletedError extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(400)
            .setMessage("Token deleted , Login again !!")
            .setData(data)
            .build(res);
        return error;
    }
}
/**
 * Handles JSON Web Token errors (HTTP 400).
 * This class builds a JSONWebTokenError response and sends it to the client.
 */
export class JSONWebTokenError extends BaseResponseClass {
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
    handleResponse(res, data) {
        const error = this.builderInstance
            .setStatus(400)
            .setMessage("Current token was signed with different signature , try signing in again")
            .setData(data)
            .build(res);
        return error;
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
export const globalErrorHandlingMiddleware = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Some internal server error occurred.";
    if (err.code === 11000) {
        err = new DuplicateError().handleResponse(res, {
            info: "Current data already exist , try creating different",
        });
    }
    if (err.stack?.startsWith("ValidationError")) {
        err = new ValidationError().handleResponse(res, {
            info: "Provide some valid fields",
        });
    }
    if (err.stack?.startsWith("CastError")) {
        err = new ValidationError().handleResponse(res, {
            info: "Unable to fetch the data",
        });
    }
    if (err.stack?.startsWith("JsonWebTokenError")) {
        err = new JSONWebTokenError().handleResponse(res, {
            info: "Invalid token associated with user",
        });
    }
    if (env.NODE_ENV === "production") {
        sendProdError(err, res);
    }
    else {
        sendDevError(err, res);
    }
};
