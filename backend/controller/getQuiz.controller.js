import Quiz from "../model/quiz.model.js";

const getQuiz = async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.json(quizes);
  } catch (error) {
    res.json(error);
  }
};

export default getQuiz;
