// Define your word list
let words = []; // Empty array to store words

// Function to choose a random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Load words from the text file
fetch("list.txt")
  .then((response) => response.text())
  .then((data) => {
    // Split the text into an array of words
    words = data.trim().split("\n");
  });

// Function to display the hidden word
function displayHiddenWord(word) {
  let hiddenDisplay = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] === "") {
      hiddenDisplay += "";
    } else {
      hiddenDisplay += " _";
    }
  }
  return hiddenDisplay;
}

// Function to check if the letter is in the word
function isLetterInWord(letter, word) {
  return word.includes(letter);
}

// Function to update the hidden word with the guessed letter
function updateHiddenWord(letter, hiddenWord, word) {
  let newHiddenWord = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      newHiddenWord += letter;
    } else {
      newHiddenWord += hiddenWord[i];
    }
  }
  return newHiddenWord;
}

document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const wordDisplay = document.getElementById("wordDisplay");
  const gameStatus = document.getElementById("gameStatus");
  const letterButtonsContainer = document.getElementById("letterButtons"); // Add this line

  let chosenWord;
  let hiddenWord;
  let lettersGuessed;
  let mistakes;

  // Function to create letter buttons
  function createLetterButtons() {
    for (let charCode = 97; charCode <= 122; charCode++) {
      const letter = String.fromCharCode(charCode);
      const button = document.createElement("button");
      button.textContent = letter;
      button.classList.add(
        "mx-1",
        "my-2",
        "px-4",
        "py-2",
        "bg-blue-500",
        "hover:bg-blue-600",
        "text-white",
        "font-bold",
        "rounded"
      );
      button.addEventListener("click", function () {
        if (!lettersGuessed.includes(letter)) {
          lettersGuessed.push(letter);
          guessLetter(letter);
        }
      });
      letterButtonsContainer.appendChild(button);
    }
  }

  // Function to start the game
  function startGame() {
    chosenWord = getRandomWord();
    hiddenWord = displayHiddenWord(chosenWord);
    lettersGuessed = [];
    mistakes = 0;

    wordDisplay.textContent = hiddenWord;
    gameStatus.textContent = "Vies restantes : 6"; // Initial lives left
    guessInput.classList.remove("hidden");

    letterButtonsContainer.innerHTML = "";

    // Create letter buttons when the game starts
    createLetterButtons();
  }

  // Function to guess a letter
  function guessLetter(letter) {
    if (isLetterInWord(letter, chosenWord)) {
      hiddenWord = updateHiddenWord(letter, hiddenWord, chosenWord);
      wordDisplay.textContent = hiddenWord;
      if (hiddenWord === chosenWord) {
        gameStatus.textContent = "Bravo! T'as trouvé le mot sal zeugma.";
        guessInput.classList.add("hidden");
      }
    } else {
      mistakes++;
      if (mistakes === 6) {
        gameStatus.textContent = `T'as perdu! Le mot était "${chosenWord}" sal looser take the L.`;
        guessInput.classList.add("hidden");
      } else {
        gameStatus.textContent = `Vies restantes : ${6 - mistakes}`; // Update lives left
      }
    }
  }

  // Event listener for the start button
  startBtn.addEventListener("click", startGame);

  // Event listener for the guess button
  guessBtn.addEventListener("click", function () {
    const letterInput = document
      .getElementById("letterInput")
      .value.toLowerCase();
    if (!letterInput || lettersGuessed.includes(letterInput)) return;

    lettersGuessed.push(letterInput);
    guessLetter(letterInput);
  });
});
