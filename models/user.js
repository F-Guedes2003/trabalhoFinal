import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    password: { type: String, required: true }
});

export default user = mongoose.model("user", userSchema);