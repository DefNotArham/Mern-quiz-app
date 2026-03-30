import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./db/connectDb.js";
import quizRoutes from "./routes/quiz.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/quiz", quizRoutes);

await connectDb();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
