import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js"
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";



dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);


app.get("/", (req, res) => {
    res.send("job api is running ");
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on the ${PORT}`));