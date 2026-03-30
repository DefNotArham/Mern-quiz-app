import express from "express";

import createQuiz from "../controller/createQuiz.controller.js";

const router = express.Router();

router.post("/create", createQuiz);

export default router;
