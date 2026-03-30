import Quiz from "../model/quiz.model.js";

const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;
  try {
    if (
      !title ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    )
      return res.status(400).json({
        success: false,
        message: "All reuqired fields are required",
      });

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.question || !q.options || !q.answer)
        return res.status(400).json({
          success: false,
          message: `Question ${i + 1} is missing fields`,
        });

      for (let j = 0; j < q.options.length; j++) {
        const option = q.options[j];
        if (!option)
          return res.status(400).json({
            success: false,
            message: `Question ${i + 1} has an empty option`,
          });
      }
    }

    const newQuiz = new Quiz({
      title,
      description,
      questions,
    });

    await newQuiz.save();

    res.status(201).json({
      success: true,
      message: "Quiz created!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating the quiz",
    });
  }
};

export default createQuiz;
