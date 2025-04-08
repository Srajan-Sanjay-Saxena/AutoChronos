import {} from "../Types/extras.types.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";
import { BaseResponseClass } from "../Helpers/base.class.js";
/**
 * @class OkResponseStrategy
 * @description Handles the creation of a successful "OK" response, typically used for successful requests that return data.
 * @typeparam TObj - The type of data to be returned in the response.
 */
export class OkResponseStrategy extends BaseResponseClass {
    constructor() {
        super(ApiResponse);
    }
    /**
    * @description Handles the response by setting the status, message, and data.
    * @param res - The HTTP response object used to send back the response.
    * @param data - The data to be included in the response.
    * @returns - Sets the response with status 200 and the provided data.
    */
    handleResponse(res, data) {
        this.builderInstance
            .setStatus(200)
            .setMessage("OK Response")
            .setData(data)
            .build(res);
    }
}
/**
 * @class UpdateResponseStrategy
 * @description Handles the creation of a successful update response, typically used for successful update requests.
 * @typeparam TObj - The type of data to be returned in the response.
 */
export class UpdateResponseStrategy extends BaseResponseClass {
    constructor() {
        super(ApiResponse); // Specify the class type (ApiResponse)
    }
    /**
       * @description Handles the response by setting the status, message, and updated data.
       * @param res - The HTTP response object used to send back the response.
       * @param data - The updated data to be included in the response.
       * @returns - Sets the response with status 200 and the updated data.
       */
    handleResponse(res, data) {
        this.builderInstance // sets the HTTP status code to 200(ok)
            .setStatus(200)
            .setMessage("OK Response") //sets the response message
            .setData(data) // Include updated data
            .build(res); //sends the response
    }
}
/**
 * @class CreateResponseStrategy
 * @description Handles the creation of a successful creation response, typically used when a resource is created successfully.
 * @typeparam TObj - The type of data to be returned in the response.
 */
export class CreateResponseStrategy extends BaseResponseClass {
    constructor() {
        super(ApiResponse); // Specify the class type (ApiResponse)
    }
    /**
       * @description Handles the response by setting the status, message, and data for a successful creation.
       * @param res - The HTTP response object used to send back the response.
       * @param data - The created data to be included in the response.
       * @returns - Sets the response with status 200 and the creation data.
       */
    handleResponse(res, data) {
        this.builderInstance
            .setStatus(200)
            .setMessage("Request approved successfully")
            .setData(data) // Include data for creation
            .build(res);
    }
}
/**
 * @class DeleteResponseStrategy
 * @description Handles the creation of a successful delete response, typically used when a resource is successfully deleted.
 * @typeparam TObj - The type of data, though not typically needed for deletion.
 */
export class DeleteResponseStrategy extends BaseResponseClass {
    constructor() {
        super(ApiResponse); // Specify the class type (ApiResponse)
    }
    /**
     * @description Handles the response by setting the status and message for a successful deletion.
     * @param res - The HTTP response object used to send back the response.
     * @param data - Data is not typically required for a delete response.
     * @returns - Sets the response with status 204 (No Content) and a deletion message.
     */
    handleResponse(res, data) {
        this.builderInstance
            .setStatus(204) // No content for deletion
            .setMessage("Deleted Successfully")
            .build(res); // Data is not needed for successful delete response
    }
}
