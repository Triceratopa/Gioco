class Guide extends Sprite {
  constructor({
    position,
    imageSrc,
    dialog = [],
    missions = [],
    frameBuffer,
    frameRate,
    loop,
    autoplay,
    answer = [],
  }) {
    super({ position, imageSrc, frameBuffer, frameRate, loop, autoplay });
    this.dialog = dialog;
    this.currentDialogIndex = 0;
    this.showDialog = false;
    this.missions = missions;
    this.currentQuestionIndex = 0;
    this.showQuestion = false;
    this.answer = answer;
    this.showAnswer = false;
    this.currentAnswerIndex = 0;
  }

  draw() {
    super.draw(); // Disegna lo sprite base (ereditato da Sprite)
    this.drawTextBox(); // Disegna la finestra di dialogo
  }

  startDialog() {
    this.showDialog = true;
    this.currentDialogIndex = 0;
  }

  nextDialog() {
    if (this.currentDialogIndex < this.dialog.length - 1) {
      this.currentDialogIndex++;
    } else {
      this.showDialog = false;
      this.startQuestion();
    }
  }

  startQuestion() {
    this.showQuestion = true;
  }

  finishQuiz() {
    this.showQuestion = false;
  }

  startAnswer() {
    this.showAnswer = true;
  }
  nextAnswer() {
    const currentQ = this.missions[this.currentQuestionIndex];

    // Se abbiamo mostrato la risposta, nascondiamola e passiamo alla domanda successiva
    if (this.showAnswer) {
      this.showAnswer = false; // Nascondi la risposta
      if (this.currentDialogIndex < this.dialog.length - 1) {
        this.currentDialogIndex++;
      } else {
        this.showDialog = false;
        this.finishQuiz();
      }
    }
  }

  drawTextBox() {
    if (!this.showDialog && !this.showQuestion && !this.showAnswer) return;

    // Disegna la finestra di dialogo/quiz
    c.fillStyle = "rgba(0, 0, 0, 0.8)";
    c.fillRect(30, canvas.height - 140, canvas.width - 80, 130);

    c.fillStyle = "white";
    c.font = "18px Arial";

    const boxStartY = canvas.height - 120; // Posizione di partenza per il testo

    if (this.showDialog) {
      // Mostra il dialogo
      c.fillText(this.dialog[this.currentDialogIndex], 60, boxStartY);
    } else if (this.showQuestion && !this.showAnswer) {
      // Mostra la domanda
      const currentQ = this.missions[this.currentQuestionIndex];
      c.fillText(currentQ.question, 60, boxStartY);

      // Disegna le risposte dentro il box
      this.answerPositions = [];
      currentQ.options.forEach((option, index) => {
        const x = 60;
        const y = boxStartY + (index + 1) * 30;

        // Limita la posizione per evitare di andare oltre il box
        if (y < canvas.height - 20) {
          c.fillText(`${index + 1}) ${option}`, x, y);
          this.answerPositions.push({
            x,
            y,
            width: canvas.width - 80,
            height: 30,
          });
        }
      });
    } else if (this.showAnswer) {
      c.fillText(this.answer[this.currentAnswerIndex], 60, boxStartY);
    }
  }
  handleClick(event) {
    if (this.showQuestion) {
      // Prendo le coordinate del click
      const clickX = event.clientX;
      const clickY = event.clientY;

      // Verifico se il click  una delle risposte
      this.answerPositions.forEach((position, index) => {
        if (
          clickX > position.x &&
          clickX < position.x + position.width &&
          clickY > position.y &&
          clickY < position.y + position.height
        ) {
          this.checkAnswer(index);
        }
      });
    }
  }

  checkAnswer(selectedIndex) {
    const currentQ = this.missions[this.currentQuestionIndex];
    const selectedAnswer = currentQ.options[selectedIndex]; // Così ottengo la risposta selezionata

    const modal = document.getElementById("wrong");
    const closeModal = document.querySelector(".close");
    const error = document.getElementById("error");

    if (selectedAnswer === currentQ.answer) {
      console.log("Risposta corretta!");
      this.showAnswer = true;
    } else {
      console.log("Risposta errata!");
      //inserisco un messaggio per la risposta sbagliata
      let wrongAnswer = "riprova";
      if (selectedAnswer !== currentQ.answer) {
        wrongAnswer;
      }

      //modale per il messaggio di errore
      error.textContent = wrongAnswer;
      modal.style.display = "block";

      closeModal.onclick = () => {
        modal.style.display = "none";
      };
    }
  }
}
