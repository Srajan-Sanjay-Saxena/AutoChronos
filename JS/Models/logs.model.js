import mongoose from "mongoose";
const crud = new mongoose.Schema({
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
export const Command = mongoose.model('Command', crud);
