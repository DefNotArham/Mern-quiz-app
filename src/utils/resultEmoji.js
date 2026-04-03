const resultEmoji = (playerScore, totalQuestions) => {
  const percent = (playerScore / totalQuestions) * 100;

  if (percent === 100) {
    return "🏆";
  } else if (percent >= 80) {
    return "🎉";
  } else if (percent >= 50) {
    return "🙂";
  } else if (percent > 0) {
    return "😕";
  } else {
    return "💀";
  }
};

export default resultEmoji;
