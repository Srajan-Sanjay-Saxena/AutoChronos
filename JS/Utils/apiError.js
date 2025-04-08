import {} from "../Types/extras.types.js";
export class ApiError extends Error {
    statusCode;
    isOperational;
    data;
    constructor(statusCode, message, isOperational = true, data) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.data = data;
    }
}
