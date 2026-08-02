import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();
// console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const app = express();

connectDB();


app.use(cors({
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(rateLimiter);



app.use("/api/notes", notesRoutes);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});