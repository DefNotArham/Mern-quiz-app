import express from "express";

import createQuiz from "../controller/createQuiz.controller.js";
import getQuiz from "../controller/getQuiz.controller.js";
import deleteQuiz from "../controller/deleteQuiz.controller.js";
import startQuiz from "../controller/startQuiz.controller.js";

const router = express.Router();

router.post("/create", createQuiz);
router.get("/getquiz", getQuiz);
router.delete("/deletequiz/:id", deleteQuiz);
router.get("/startQuiz/:id", startQuiz);

export default router;
