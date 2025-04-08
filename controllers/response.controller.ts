/**
 * @module ResponseStrategies
 *
 * This module defines various response strategies used in handling HTTP responses for different operations. 
 * These strategies are designed to standardize the responses for CRUD operations and ensure consistency across the application.
 *
 * ### Design Patterns Used:
 *
 * 1. **Strategy Pattern**:  
 *    - The `OkResponseStrategy`, `UpdateResponseStrategy`, `CreateResponseStrategy`, and `DeleteResponseStrategy` classes follow the Strategy design pattern. Each class encapsulates the specific logic for handling a successful response for different types of operations, such as creation, updating, or deletion of resources.
 *
 * 2. **Builder Pattern**:  
 *    - The `BaseResponseClass` uses the Builder pattern to construct API responses. The builder is used to set various parts of the response (status, message, data) before finalizing it with the `build` method.
 *
 * 3. **Error Handling Pattern**:  
 *    - The `ApiError` class is used to handle errors consistently across all response types. Each strategy checks if the response is valid and returns an error when needed.
 *
 * ### Implementation Details:
 *
 * - **`OkResponseStrategy`**:  
 *    Handles the creation of a generic "OK" response. This is used for successful requests that return data. It sets the response status to 200 and includes the provided data in the response body.
 *  
 * - **`UpdateResponseStrategy`**:  
 *    Similar to the `OkResponseStrategy`, but specifically used for successful update requests. It sets the status to 200 and returns the updated data.
 *  
 * - **`CreateResponseStrategy`**:  
 *    Used when a new resource has been created successfully. It responds with a 200 status code and the created data. The message is customized to indicate a successful creation.
 *  
 * - **`DeleteResponseStrategy`**:  
 *    Used when a resource is successfully deleted. It sends a response with a 204 (No Content) status, indicating that the resource has been deleted without returning any data.
 *  
 * ### Key Points:
 *
 * - **Consistency in Responses**:  
 *   Each response strategy ensures that the API responses follow a consistent structure, with clear status codes, messages, and data when appropriate.
 *  
 * - **Use of BaseResponseClass**:  
 *   All strategies inherit from the `BaseResponseClass`, which ensures that the same response building logic is reused across different types of responses.
 *  
 * - **Support for Multiple Operations**:  
 *   This module covers a wide range of HTTP methods, including creation (`POST`), update (`PUT`), deletion (`DELETE`), and retrieval (`GET`).
 *
 * ### Example Usage:
 *
 * - **OK Response**:  
 *   To return a successful response with data, use `OkResponseStrategy.handleResponse(res, data)`.
 *
 * - **Update Response**:  
 *   To return a successful response after updating a resource, use `UpdateResponseStrategy.handleResponse(res, updatedData)`.
 *
 * - **Create Response**:  
 *   For a successful resource creation, use `CreateResponseStrategy.handleResponse(res, createdData)`.
 *
 * - **Delete Response**:  
 *   To return a successful response after deletion, use `DeleteResponseStrategy.handleResponse(res)`.
 */
import type { Response } from "express";
import { type ResData } from "../Types/extras.types.js";
import { ApiResponse } from "../Utils/apiResponse.js";

import { ApiError } from "../Utils/apiError.js";
import { BaseResponseClass } from "../Helpers/base.class.js";
/**
 * @class OkResponseStrategy
 * @description Handles the creation of a successful "OK" response, typically used for successful requests that return data.
 * @typeparam TObj - The type of data to be returned in the response.
 */
export class OkResponseStrategy<TObj extends ResData> extends BaseResponseClass<
  TObj,
  ApiResponse<TObj>
> {
  constructor() {
    super(ApiResponse);
  }
   /**
   * @description Handles the response by setting the status, message, and data.
   * @param res - The HTTP response object used to send back the response.
   * @param data - The data to be included in the response.
   * @returns - Sets the response with status 200 and the provided data.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    this.builderInstance
      .setStatus(200)
      .setMessage("OK Response")
      .setData(data as TObj)
      .build(res);
  }
}
/**
 * @class UpdateResponseStrategy
 * @description Handles the creation of a successful update response, typically used for successful update requests.
 * @typeparam TObj - The type of data to be returned in the response.
 */
export class UpdateResponseStrategy<
  TObj extends ResData
> extends BaseResponseClass<TObj, ApiResponse<TObj>> {
  constructor() {
    super(ApiResponse); // Specify the class type (ApiResponse)
  }
/**
   * @description Handles the response by setting the status, message, and updated data.
   * @param res - The HTTP response object used to send back the response.
   * @param data - The updated data to be included in the response.
   * @returns - Sets the response with status 200 and the updated data.
   */
  public override handleResponse(
    res: Response,
    data: TObj
  ): void | ApiError<TObj> {
    this.builderInstance// sets the HTTP status code to 200(ok)
      .setStatus(200)
      .setMessage("OK Response")//sets the response message
      .setData(data) // Include updated data
      .build(res);//sends the response
  }
}
/**
 * @class CreateResponseStrategy
 * @description Handles the creation of a successful creation response, typically used when a resource is created successfully.
 * @typeparam TObj - The type of data to be returned in the response.
 */
export class CreateResponseStrategy<
  TObj extends ResData
> extends BaseResponseClass<TObj, ApiResponse<TObj>> {
  constructor() {
    super(ApiResponse); // Specify the class type (ApiResponse)
  }
/**
   * @description Handles the response by setting the status, message, and data for a successful creation.
   * @param res - The HTTP response object used to send back the response.
   * @param data - The created data to be included in the response.
   * @returns - Sets the response with status 200 and the creation data.
   */
  public override handleResponse(
    res: Response,
    data: TObj
  ): void | ApiError<TObj> {
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
export class DeleteResponseStrategy<
  TObj extends ResData
> extends BaseResponseClass<TObj, ApiResponse<TObj>> {
  constructor() {
    super(ApiResponse); // Specify the class type (ApiResponse)
  }
  /**
   * @description Handles the response by setting the status and message for a successful deletion.
   * @param res - The HTTP response object used to send back the response.
   * @param data - Data is not typically required for a delete response.
   * @returns - Sets the response with status 204 (No Content) and a deletion message.
   */
  public override handleResponse(
    res: Response,
    data?: TObj
  ): void | ApiError<TObj> {
    this.builderInstance
      .setStatus(204) // No content for deletion
      .setMessage("Deleted Successfully")
      .build(res); // Data is not needed for successful delete response
  }
}
