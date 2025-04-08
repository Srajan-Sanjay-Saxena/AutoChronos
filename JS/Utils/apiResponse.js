export class ApiResponse {
    message;
    statusCode;
    data;
    constructor(message, statusCode, data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
    ResponseSender(res) {
        return res.status(this.statusCode).json({
            statusCode: this.statusCode,
            message: this.message,
            ...this.data,
        });
    }
}
