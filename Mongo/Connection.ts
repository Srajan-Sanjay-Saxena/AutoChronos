
import mongoose, { Model, Schema } from "mongoose";
import type { HydratedDocument } from "mongoose";
import { dbResolver } from "./dbResolver.js";
import { env } from "../newProcess.js";
import type { MethodBase, VirtualBase } from "../Types/extras.types.js";

const DB = dbResolver(env.DB);

class MongoDBConnection {
  private static mongoInstance: MongoDBConnection;
  private dbConn!: mongoose.Connection;

  private constructor() {
    this.dbConn = mongoose.connection;
    mongoose
      .connect(DB, { dbName: "Testing" })
      .then(() => console.log("Connected to the database......."))
      .catch((err: Error) => {
        console.log("Some error occurred");
        console.log("Error name : ", err.name);
        console.log("Error message : ", err.message);
      });
    this.spyOnDb();
  }
  private spyOnDb() {
    this.dbConn.on("open", () => console.log("open"));
    this.dbConn.on("disconnected", () => console.log("disconnected"));
    this.dbConn.on("reconnected", () => console.log("reconnected"));
    this.dbConn.on("disconnecting", () => console.log("disconnecting"));
    this.dbConn.on("close", () => console.log("close"));
  }

  public static getInstance() {
    if (!MongoDBConnection.mongoInstance) {
      MongoDBConnection.mongoInstance = new MongoDBConnection();
    }
    return MongoDBConnection.mongoInstance;
  }

  public getModel<
    TSchema extends Schema,
    TMethods extends MethodBase,
    TVirtual extends VirtualBase
  >(
    modelName: string,
    schema: Schema<HydratedDocument<TSchema, TMethods, TVirtual>>
  ): Model<HydratedDocument<TSchema, TMethods, TVirtual>> {
    if (mongoose.modelNames().includes(modelName)) {
      return mongoose.model<HydratedDocument<TSchema, TMethods, TVirtual>>(
        modelName
      );
    }
    return mongoose.model<HydratedDocument<TSchema, TMethods, TVirtual>>(
      modelName,
      schema
    );
  }
}

export const mongoInstance = MongoDBConnection.getInstance();
