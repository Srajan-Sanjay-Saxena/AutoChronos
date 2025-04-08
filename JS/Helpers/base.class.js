import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import {} from "express";
import {} from "../Types/extras.types.js";
import { ApiBuilder } from "../Utils/api.builder.js";
/**
 * BaseResponseClass - Abstract base class for handling different response types.
 * @template TData - The data type to be included in the response.
 * @template TClass - The class type of the response (either ApiResponse or ApiError).
 */
export class BaseResponseClass {
    ResponseClass;
    builderInstance;
    constructor(ResponseClass) {
        this.ResponseClass = ResponseClass;
        this.builderInstance = new ApiBuilder(ResponseClass);
    }
}
