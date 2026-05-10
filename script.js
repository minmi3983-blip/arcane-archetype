// =====================
// 状態管理
// =====================

let currentQuestion = 0;

let scoreX = 0;
let scoreY = 0;

// =====================
// HTML取得
// =====================

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");

const progressText = document.getElementById("progress");
const questionText = document.getElementById("question-text");

const answerButtons = document.querySelectorAll("#answer-buttons button");

const resultName = document.getElementById("result-name");
const resultDescription = document.getElementById("result-description");

// =====================
// 診断開始
// =====================

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  questionScreen.style.display = "block";

  showQuestion();
});

// =====================
// 質問表示
// =====================

function showQuestion() {

  const question = questions[currentQuestion];

  progressText.textContent =
    `Q${currentQuestion + 1} / ${questions.length}`;

  questionText.textContent = question.text;
}

// =====================
// 回答ボタン
// =====================

answerButtons.forEach(button => {

  button.addEventListener("click", () => {

    const answer = Number(button.dataset.score);

    handleAnswer(answer);

  });

});

// =====================
// 回答処理
// =====================

function handleAnswer(answer) {

  const question = questions[currentQuestion];

  // 1~5 → -2~2
  const converted = answer - 3;

  // ===== X軸 =====

  if (question.axis === "x") {

    scoreX += converted * question.value;

  }

  // ===== Y軸 =====

  if (question.axis === "y") {

    scoreY += converted * question.value;

  }

  // ===== XY複合 =====

  if (question.axis === "xy") {

    scoreX += converted * question.value.x;

    scoreY += converted * question.value.y;

  }

  // 次の質問へ
  currentQuestion++;

  // 全問終了判定
  if (currentQuestion >= questions.length) {

    showResult();

  } else {

    showQuestion();

  }

}

// =====================
// 結果判定
// =====================

function determineType() {

  // 中央判定
  if (
    scoreX >= -2 &&
    scoreX <= 2 &&
    scoreY >= -2 &&
    scoreY <= 2
  ) {
    return types.chloe;
  }

  // 発信 × 交流
  if (scoreX > 0 && scoreY > 0) {
    return types.arile;
  }

  // 発信 × 没頭
  if (scoreX > 0 && scoreY < 0) {
    return types.nimia;
  }

  // 傾聴 × 交流
  if (scoreX < 0 && scoreY > 0) {
    return types.harmo;
  }

  // 傾聴 × 没頭
  if (scoreX < 0 && scoreY < 0) {
    return types.garp;
  }

  // 保険
  return types.chloe;
}

// =====================
// 結果表示
// =====================

function showResult() {

  questionScreen.style.display = "none";

  resultScreen.style.display = "block";

  const result = determineType();

  resultName.textContent = result.name;

  resultDescription.textContent = result.description;

  console.log("X:", scoreX);
  console.log("Y:", scoreY);

}
