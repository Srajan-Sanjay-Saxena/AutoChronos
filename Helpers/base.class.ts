import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";

import { type NextFunction, type Response } from "express";
import { type ResData } from "../Types/extras.types.js";
import { ApiBuilder } from "../Utils/api.builder.js";


/**
 * Interface Agreement - Defines the contract for response handling in derived classes.
 * @template T - The data type for the response.
 */
interface Agreement<T extends ResData> {
   /**
   * Handles the response to be sent back to the client.
   * @param res - The response object.
   * @param Data - Optional data to be included in the response.
   * @returns void or an Error if there is an issue with the response.
   */
  handleResponse: (res: Response, Data?: T) => void | Error;
}

/**
 * BaseResponseClass - Abstract base class for handling different response types.
 * @template TData - The data type to be included in the response.
 * @template TClass - The class type of the response (either ApiResponse or ApiError).
 */
export abstract class BaseResponseClass<
  TData extends ResData,
  TClass extends ApiResponse<TData> | ApiError<TData>
> implements Agreement<TData>
{
  protected builderInstance!: ApiBuilder<TClass, TData>;
  constructor(private ResponseClass: new (...args: Array<any>) => TClass) {
    this.builderInstance = new ApiBuilder<TClass, TData>(ResponseClass);
  }
/**
   * Abstract method to handle the response.
   * @param res - The response object.
   * @param Data - Optional data to be included in the response.
   * @returns void or an ApiError if there is an issue with the response.
   */
  abstract handleResponse(res: Response, Data?: TData): void | ApiError<TData>;
}

