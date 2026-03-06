document.addEventListener("DOMContentLoaded", () => {
    let totalScore = 0;
    const answers = {}; 
  
    const buttons = document.querySelectorAll(".option-btn[data-question]");
    const showResultsBtn = document.getElementById("show-results");
    const scoreDisplay = document.getElementById("score-display");
    const resultDisplay = document.getElementById("result-display");
  
    const totalQuestions = new Set(
      Array.from(buttons).map(b => b.dataset.question)
    ).size;
  
    function updateScoreUI() {
      scoreDisplay.textContent = `Score: ${totalScore}`;
    }
  
    function getBookResult(score) {
      if (score >= 44 && score <= 50) {
        return {
          book: "The Picture of Dorian Gray",
          vibe: "Have a ego and will always get what you desire. However, it may also be your downfall."
        };
      }
      if (score >= 36 && score <= 43) {
        return {
          book: "Frankenstein",
          vibe: "Motivated by passions, argumentative, deep passion for learning."
        };
      }
      if (score >= 28 && score <= 35) {
        return {
          book: "The Stranger",
          vibe: "Just gliding through life, whatever happens happens , you always stay true to yourself."
        };
      }
      if (score >= 20 && score <= 27) {
        return {
          book: "Jane Eyre",
          vibe: "Confident, Independent, self reliant and a hopeless romantic."
        };
      }
      return {
        book: "Not enough answers yet 🙂",
        vibe: "Finish the quiz to get your result."
      };
    }
  
    function highlightSelected(qid, clickedBtn) {
      document
        .querySelectorAll(`.option-btn[data-question="${qid}"]`)
        .forEach(btn => btn.classList.remove("selected"));
  
      clickedBtn.classList.add("selected");
    }
  
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.question;
        const score = Number(btn.dataset.scores);
  
        // if a button has missing/blank data-scores, ignore it
        if (!Number.isFinite(score)) {
          console.warn("Missing/invalid data-scores on button:", btn);
          return;
        }
  
        // Undo previous answer for this question (if any)
        if (answers[qid] !== undefined) {
          totalScore -= answers[qid];
        }
  
        // Apply new answer
        totalScore += score;
        answers[qid] = score;
  
        highlightSelected(qid, btn);
        updateScoreUI();
  
        // clear old result when user changes answers
        resultDisplay.textContent = "";
      });
    });
  
    showResultsBtn.addEventListener("click", () => {
      const answeredCount = Object.keys(answers).length;
  
      if (answeredCount < totalQuestions) {
        resultDisplay.textContent = `You answered ${answeredCount}/${totalQuestions}. Finish all questions first 🙂`;
        return;
      }
  
      const { book, vibe } = getBookResult(totalScore);
      resultDisplay.innerHTML = `<strong>${book}</strong><br>${vibe}`;
    });
  
    updateScoreUI();
  });