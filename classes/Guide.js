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
        const x = 60; // Posizione fissa
        const y = boxStartY + (index + 1) * 30; // Spaziamento tra le risposte

        // Limita la posizione per evitare di andare oltre il box
        if (y < canvas.height - 20) {
          c.fillText(`${index + 1}) ${option}`, x, y);
          this.answerPositions.push({
            x,
            y,
            width: canvas.width - 80, // Larghezza della risposta
            height: 30, // Altezza della risposta
          });
        }
      });
    } else if (this.showAnswer) {
      c.fillText(this.answer[this.currentAnswerIndex], 60, boxStartY);
    }
  }

  handleClick(event) {
    if (this.showQuestion) {
      // Ottieni il rect del canvas per calcolare la posizione corretta rispetto al canvas
      const canvasRect = canvas.getBoundingClientRect();
      const clickX = event.clientX - canvasRect.left; // Corregge la posizione X
      const clickY = event.clientY - canvasRect.top; // Corregge la posizione Y

      console.log("Click rilevato a X:", clickX, "Y:", clickY);

      // Verifica se il click è dentro una delle risposte
      this.answerPositions.forEach((position, index) => {
        // Aggiungi un controllo per vedere se il click è dentro una delle posizioni delle risposte
        if (
          clickX > position.x &&
          clickX < position.x + position.width &&
          clickY > position.y &&
          clickY < position.y + position.height
        ) {
          console.log(`Risposta selezionata: ${index + 1}`);
          this.checkAnswer(index); // Verifica se la risposta è corretta
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
