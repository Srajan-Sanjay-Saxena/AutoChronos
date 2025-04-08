import { ApiResponse } from "./apiResponse.js";
export class ApiBuilder {
    ApiClass;
    apiInstance;
    static createApiInstance(ApiClass, ...args) {
        return new ApiClass(...args);
    }
    constructor(ApiClass) {
        this.ApiClass = ApiClass;
        this.ApiClass = ApiClass;
        this.reset();
    }
    reset() {
        this.apiInstance = ApiBuilder.createApiInstance(this.ApiClass, 200, "OK");
    }
    setMessage(message) {
        this.apiInstance.message = message;
        return this;
    }
    setData(data) {
        if (data) {
            this.apiInstance.data = data;
        }
        return this;
    }
    setStatus(status) {
        this.apiInstance.statusCode = status;
        return this;
    }
    build(res) {
        if (this.apiInstance instanceof ApiResponse) {
            this.apiInstance.ResponseSender(res);
        }
        const error = this.apiInstance;
        this.reset();
        return error;
    }
}
