import Quiz from "../model/quiz.model.js";

const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);

    if (!quiz)
      return res.status(400).json({
        success: false,
        message: "Quiz not found",
      });

    await Quiz.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting quiz",
    });
  }
};

export default deleteQuiz;
