document.addEventListener("DOMContentLoaded", () => {
    const game = document.getElementById("game");
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "scoreBoard";
    document.getElementById("wrapper").insertBefore(scoreBoard, game);

    let scores = { zuavo: 0, zacapoaxtla: 0 };
    let currentTurn = "zuavo";

    function updateScoreBoard() {
        scoreBoard.innerHTML = `<p>Soldado Zuavo: ${scores.zuavo} | Soldado Zacapoaxtla: ${scores.zacapoaxtla}</p>
                                <p>Turno de: ${currentTurn === "zuavo" ? "Soldado Zuavo" : "Soldado Zacapoaxtla"}</p>`;
    }

    updateScoreBoard();

    const cardsArray = [
        { id: 1, type: "text", content: "General Ignacio Zaragoza" },
        { id: 1, type: "image", content: "images/zaragoza.jpg" },
        { id: 2, type: "text", content: "Fortaleza de Loreto" },
        { id: 2, type: "image", content: "images/fortaleza-loreto.jpg" },
        { id: 3, type: "text", content: "Charles de Lorencez" },
        { id: 3, type: "image", content: "images/lorencez.jpeg" },
        { id: 4, type: "text", content: "Cumbres de Acultzingo" },
        { id: 4, type: "image", content: "images/cumbres-acultzingo.jpeg" },
        { id: 5, type: "text", content: "Tropa Mexicana" },
        { id: 5, type: "image", content: "images/tropa-mexicana.png" },
        { id: 6, type: "text", content: "Presidente Benito Juárez" },
        { id: 6, type: "image", content: "images/benito-juarez.png" },
        { id: 7, type: "text", content: "Cañones en Puebla" },
        { id: 7, type: "image", content: "images/canones-puebla.jpg" },
        { id: 8, type: "text", content: "Intervención Francesa" },
        { id: 8, type: "image", content: "images/intervencion-francesa.jpg" }
    ];
    
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    cardsArray.sort(() => 0.5 - Math.random());

    cardsArray.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = item.id;

        const front = document.createElement("div");
        front.classList.add("face", "front");
        front.innerHTML = item.type === "text" ? `<p>${item.content}</p>` : `<img src="${item.content}" alt="Imagen">`;
        
        const back = document.createElement("div");
        back.classList.add("back");
        back.innerHTML = `<p>?</p>`;

        card.appendChild(front);
        card.appendChild(back);
        game.appendChild(card);

        card.addEventListener("click", () => activateCard(card));
    });

    function activateCard(card) {
        if (lockBoard || card === firstCard || card.classList.contains("matched")) return;
        
        card.classList.add("active");
        
        if (!firstCard) {
            firstCard = card;
            return;
        }
        
        secondCard = card;
        lockBoard = true;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.id === secondCard.dataset.id;
    
        if (isMatch) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            scores[currentTurn]++;  // Suma puntos si es correcto
            updateScoreBoard();
            resetBoard();  // No cambia turno, porque acertó
            checkForWinner();
        } else {
            setTimeout(() => {
                firstCard.classList.remove("active");
                secondCard.classList.remove("active");
                switchTurn();  // Cambia turno solo si es incorrecto
                updateScoreBoard();
                resetBoard();
            }, 1000);
        }
    }
    

    function switchTurn() {
        currentTurn = currentTurn === "zuavo" ? "zacapoaxtla" : "zuavo";
    }

    function resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    let resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reiniciar Juego';
    resetButton.addEventListener('click', resetGame);
    document.body.appendChild(resetButton);

    function resetGame() {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("matched", "active");
        });
        scores = { zuavo: 0, zacapoaxtla: 0 };
        currentTurn = "zuavo";
        updateScoreBoard();
    }

    function checkForWinner() {
        if (scores.zuavo >= 8) {
            alert("¡Soldado Zuavo ha ganado! 🎉");
            setTimeout(() => {
                window.location.href = "/memorama-main/video/zuavo.html"; // Redirección directa
            }, 500);
        } else if (scores.zacapoaxtla >= 8) {
            alert("¡Soldado Zacapoaxtla ha ganado! 🎉");
            setTimeout(() => {
                window.location.href = "/memorama-main/video/zacapoaxtla.html";                // Redirección directa
            }, 500);
        }
    }    
});
