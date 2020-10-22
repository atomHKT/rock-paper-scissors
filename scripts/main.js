// Global constant defining array of possible selections
const TOTAL_ROUNDS = 5;
const ARR_RPS = ["rock", "paper", "scissors"];

function createGameListeners() {
	// Player selection listeners
	buttons.forEach(button => button.addEventListener('click', (e) => {
		playRound(e.target.parentNode.id);
	}));
	// Round result listener (corresponding node not visible at game start)
	roundResult.addEventListener('click', displayRound);
	// Game result listener (corresponding node not visible at game start)
	gameResult.addEventListener('click', newGame);
}

// This function returns randomly a string "rock", "paper" or "scissors"
function computerPlay() {
	const random = Math.floor(Math.random() * ARR_RPS.length); // Generate random number between 0 and 2
	return ARR_RPS[random];
}

// This function displays the player options (rock paper scissors) when a new round is played
function displayRound() {
	const roundNumber = Number(roundNode.textContent) + 1;
	const playerScore = Number(playerNode.textContent);
	const computerScore = Number(computerNode.textContent);

	// Check if the total rounds has been reached; if true, display game result
	// and exit the function
	if (roundNumber >= TOTAL_ROUNDS + 1) {
		displayGameResult(playerScore, computerScore);
		return;
	}
	roundNode.textContent = roundNumber;
	playerResult.childNodes[1].className = "far fa-hand-:player:";
	computerResult.childNodes[1].className = "far fa-hand-:computer:";
	rpsButtons.className = "visible";
	roundResult.className = "hidden";
}

// This function displays the round result
function displayRoundResult(playerSelec, computerSelec) {
	playerResult.childNodes[1].className = playerResult.childNodes[1].className
		.replace(':player:', playerSelec);
	computerResult.childNodes[1].className = computerResult.childNodes[1].className
		.replace(':computer:', computerSelec);

	roundResult.className = "visible";
	rpsButtons.className = "hidden";
}

// This function display the end of game score
function displayGameResult(playerScore, computerScore) {
	if (playerScore === computerScore) {
		winnerLoser.textContent = "DRAW";
		winnerLoser.className = "blue"
	} else if (playerScore > computerScore) {
		winnerLoser.textContent = "WINNER";
		winnerLoser.className = "green"
	} else {
		winnerLoser.textContent = "LOSER";
		winnerLoser.className = "red"
	}
	// Get the height of roundResult node and apply it to gameResult node
	gameResult.style.height = window.getComputedStyle(roundResult).height;
	gameResult.className = "visible";
	roundResult.className = "hidden";
}

// This function plays the round if player has made his selection (click on rock paper or scissors)
function playRound(player) {
	const playerScore = Number(playerNode.textContent);
	const computerScore = Number(computerNode.textContent);

	let computer = computerPlay();
	switch (true) {
		case (player === computer):
			playerNode.textContent = playerScore + 1;
			computerNode.textContent = computerScore + 1;
			break;
		case (((player === "rock") && (computer === "scissors")) ||
			((player === "paper") && (computer === "rock")) ||
			((player === "scissors") && (computer === "paper"))):
			playerNode.textContent = playerScore + 1;
			break;
		default:
			computerNode.textContent = computerScore + 1;
			break;
	}
	displayRoundResult(player, computer);
}

// This function generates a 5 rounds game of Rock Paper Scissors,
// initialize score and display
function newGame() {
	roundNode.textContent = "1";
	totalRounds.textContent = TOTAL_ROUNDS;
	playerNode.textContent = "0";
	computerNode.textContent = "0";

	rpsButtons.className = "visible";
	gameResult.className = "hidden";

}

/////////////// Main ///////////////

const buttons = document.querySelectorAll('.btn');
const roundNode = document.getElementById("round-number");
const totalRounds = document.getElementById("total-rounds");
const playerNode = document.getElementById("player-score");
const computerNode = document.getElementById("computer-score");
const rpsButtons = document.getElementById("rps-buttons-container");
const roundResult = document.getElementById("round-result");
const playerResult = document.getElementById("player-result");
const computerResult = document.getElementById("computer-result");
const gameResult = document.getElementById("game-result");
const winnerLoser = document.getElementById("winner-loser");

// Create the event listeners
createGameListeners()
// Start the game!
newGame();