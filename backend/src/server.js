// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import notesRoutes from "./routes/notesRoutes.js";
// import rateLimiter from "./middleware/rateLimiter.js";
// import cors from "cors";
// import path from "path";

// dotenv.config();
// // console.log("FRONTEND_URL:", process.env.FRONTEND_URL);



// const app = express();
// const __dirname = path.resolve();
// connectDB();



// app.use(cors({
//     origin: process.env.FRONTEND_URL
// }));
// if (process.env.NODE_ENV === "production") {
//     app.use(express.json());
//     app.use(rateLimiter);
// }



// app.use("/api/notes", notesRoutes);
// const PORT = process.env.PORT || 5001;

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/thinkboard/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "../frontend/thinkboard/dist/index.html"));
//     });

//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });}












import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

connectDB();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

if (process.env.NODE_ENV === "production") {
    app.use(rateLimiter);

    app.use(
        express.static(
            path.join(__dirname, "frontend/thinkboard/dist")
        )
    );

    app.get("*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "frontend/thinkboard/dist/index.html")
        );
    });
}

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});