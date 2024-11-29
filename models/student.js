import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    ra: { type: String, required: true },
    nota1: { type: Number },
    nota2: { type: Number },
})