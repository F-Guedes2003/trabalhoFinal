import 'dotenv/config';
import mongoose from "mongoose";

const mongoKey = process.env.DB_KEY;

const connectToMongo = async () => {
    try {
        await mongoose.connect(`mongodb+srv://fhelipped:${mongoKey}@finalwork.09ngu.mongodb.net/?retryWrites=true&w=majority&appName=FinalWork`)
        console.log("Connected to mongoDB successfully!");
    } catch (err) {
        console.error(err + "Failed to connect to database");
    }
}

export { connectToMongo };