import Quiz from "../model/quiz.model.js";

const startQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);

    if (!quiz)
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });

    res.status(200).json({
      success: true,
      message: "Quiz fetched successfully",
      quiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching quiz",
    });
  }
};
export default startQuiz;
