import mongoose, { Model, Schema } from "mongoose";
import { dbResolver } from "./dbResolver.js";
import { env } from "../newProcess.js";
const DB = dbResolver(env.DB);
class MongoDBConnection {
    static mongoInstance;
    dbConn;
    constructor() {
        this.dbConn = mongoose.connection;
        mongoose
            .connect(DB, { dbName: "Testing" })
            .then(() => console.log("Connected to the database......."))
            .catch((err) => {
            console.log("Some error occurred");
            console.log("Error name : ", err.name);
            console.log("Error message : ", err.message);
        });
        this.spyOnDb();
    }
    spyOnDb() {
        this.dbConn.on("open", () => console.log("open"));
        this.dbConn.on("disconnected", () => console.log("disconnected"));
        this.dbConn.on("reconnected", () => console.log("reconnected"));
        this.dbConn.on("disconnecting", () => console.log("disconnecting"));
        this.dbConn.on("close", () => console.log("close"));
    }
    static getInstance() {
        if (!MongoDBConnection.mongoInstance) {
            MongoDBConnection.mongoInstance = new MongoDBConnection();
        }
        return MongoDBConnection.mongoInstance;
    }
    getModel(modelName, schema) {
        if (mongoose.modelNames().includes(modelName)) {
            return mongoose.model(modelName);
        }
        return mongoose.model(modelName, schema);
    }
}
export const mongoInstance = MongoDBConnection.getInstance();
