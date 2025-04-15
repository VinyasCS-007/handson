const emojis = ['🍕','🎈','🎮','🎵','🌟','🚀','🐱','🍩'];
let cards = [...emojis, ...emojis]; // Duplicate for matching
let flippedCards = [];
let matched = 0;
let moves = 0;
let timer;
let time = 0;

// Load sound effects (assuming the files are in WAV format)
const sounds = {
  flip: new Audio("sounds/flip.wav"),
  match: new Audio("sounds/match.wav"),
  wrong: new Audio("sounds/wrong.wav")
};

// Shuffle function
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Start the game
function startGame() {
  // Reset the game state
  resetGame();

  // Simulate a win condition after 2 seconds
  setTimeout(() => {
    alert("Congratulations! You won the game!");
    // Optionally, you can add logic to display the win state on the game board
  }, 2000);
}

// Reset the game state
function resetGame() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  shuffle(cards);
  flippedCards = [];
  matched = 0;
  moves = 0;
  time = 0;
  document.getElementById("moves").innerText = "Moves: 0";
  document.getElementById("timer").innerText = "Time: 0s";
  clearInterval(timer);
  timer = setInterval(() => {
    time++;
    document.getElementById("timer").innerText = `Time: ${time}s`;
  }, 1000);

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner" data-emoji="${emoji}">
        <div class="card-front">❓</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

// Flip the card and check match
function flipCard(card) {
  if (
    card.classList.contains("flipped") ||
    flippedCards.length === 2
  ) return;

  // Play flip sound
  sounds.flip.play();

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("moves").innerText = `Moves: ${moves}`;
    const [first, second] = flippedCards;
    const emoji1 = first.querySelector(".card-inner").dataset.emoji;
    const emoji2 = second.querySelector(".card-inner").dataset.emoji;

    if (emoji1 === emoji2) {
      matched += 2;
      // Play match sound
      sounds.match.play();
      flippedCards = [];
      if (matched === cards.length) {
        clearInterval(timer);
        setTimeout(() => alert(`🎉 You won in ${moves} moves and ${time}s!`), 300);
      }
    } else {
      // Play wrong sound
      sounds.wrong.play();
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

function generateCards() {
  const cardValue = "🧠"; // Set all cards to the same value or emoji
  const totalCards = 16; // Adjust based on the number of cards in your game
  const cards = Array(totalCards).fill(cardValue); // Create an array with identical values

  // Shuffle the cards (optional, since they are all the same)
  return cards.sort(() => Math.random() - 0.5);
}

// Start the game immediately
startGame();
