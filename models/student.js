import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    ra: { type: String, required: true },
    nota1: { type: Number },
    nota2: { type: Number },
})

const Student = mongoose.model("student", studentSchema);
export default Student;