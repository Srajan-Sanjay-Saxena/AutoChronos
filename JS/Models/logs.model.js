import mongoose from "mongoose";
import { mongoInstance } from "../Mongo/Connection.js";
export const crud = new mongoose.Schema({
    machineId: {
        type: String,
        required: true
    },
    command: {
        type: String,
        required: true
    },
    result: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});
export const Command = mongoInstance.getModel('Command', crud);
