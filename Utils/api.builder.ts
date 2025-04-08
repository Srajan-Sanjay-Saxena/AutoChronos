import type { Response } from "express";
import { ApiResponse } from "./apiResponse.js";
import type { ApiError } from "./apiError.js";
import type { ResData } from "../Types/extras.types.js";

export class ApiBuilder<
  TClass extends ApiResponse<TData> | ApiError<TData>,
  TData extends ResData
> {
  private apiInstance!: TClass;

  private static createApiInstance<TClass>(
    ApiClass: new (...args: any[]) => TClass,
    ...args: ConstructorParameters<typeof ApiClass>
  ) {
    return new ApiClass(...args);
  }

  public constructor(private ApiClass: new (...args: any[]) => TClass) {
    this.ApiClass = ApiClass;
    this.reset();
  }
  private reset() {
    this.apiInstance = ApiBuilder.createApiInstance(this.ApiClass, 200, "OK");
  }
  public setMessage(message: string) {
    this.apiInstance.message = message;
    return this;
  }

  public setData(data?: TData) {
    if (data) {
      this.apiInstance.data = data;
    }
    return this;
  }
  public setStatus(status: number) {
    this.apiInstance.statusCode = status;
    return this;
  }

  public build(res: Response) {
    if (this.apiInstance instanceof ApiResponse) {
      this.apiInstance.ResponseSender(res);
    }
    const error = this.apiInstance;
    this.reset();
    return error;
  }
}
