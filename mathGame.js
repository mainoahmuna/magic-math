/****************************************
** Program: HW 6 Math Game
** Name: Noah Muna
** Date: May 14, 2023
** Course: CS 290 - 001
*****************************************/
window.addEventListener("DOMContentLoaded", domLoaded);

//assign variables
let win = false;
let playerWins = 0;
let playerLosses = 0;
let oppSelected = false;
let movesLeft = 2;
let num1 = "";
let num2 = "";
let operation = "";

/*********************************************************************
** Function: domLoaded()
** Description: sets up the gameboard and adds event listeners
*********************************************************************/ 
function domLoaded() {
	// Creates new game
	newGame();
	
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);
	
	// Create click-event handlers for each number button
	const numButtons = getNumButtons();
	for (let button of numButtons) {
		button.addEventListener("click", function () { numButtonClicked(button); });
	}

	const oppButtons = getMathButtons();
	for (let button of oppButtons) {
		button.addEventListener("click", function() { operatorPressed(button) });
	}
}

/*********************************************************************
** Function: getNumButtons()
** Description: returns array of all the buttons with numbers
*********************************************************************/ 
function getNumButtons() {
	return document.querySelectorAll("#numButtons > button");
}

/*********************************************************************
** Function: getMathButtons()
** Description: returns all the operator buttons in an array
*********************************************************************/ 
function getMathButtons() {
	return document.querySelectorAll("#mathFunctions > button");
}

/*********************************************************************
** Function: getRandomNum()
** Description: returns a random number 1 - 10
*********************************************************************/
function getRandomNum() {
	return Math.floor(Math.random() * 10) + 1;
}

/*********************************************************************
** Function: newGame()
** Description: sets up the game
*********************************************************************/
function newGame() {
	//get elements from document
	const goal = document.getElementById("goal");
	const numButtons = document.querySelectorAll("#rand");
	const turnInfo = document.getElementById("turnInfo");

	//set random numbers 1-10 to be the buttons
	for (i=0; i<numButtons.length; i++){
		let rand = getRandomNum();
		numButtons[i].innerHTML = rand;
		numButtons[i].classList.value = rand;
		numButtons[i].disabled = false;
	}

	//clear workspace
	if (document.getElementById("workspace").rows.length !== 0) {
		clearTable();
	}
	
	movesLeft = 2;

	//set turn info & wins and loss.
	turnInfo.innerHTML = "Select a number";
	document.getElementById("wins").innerHTML = "Wins: " + playerWins;
	document.getElementById("losses").innerHTML = "Losses: " + playerLosses;
	

	//set goal
	let numGoal = numButtons[0].classList.value * numButtons[2].classList.value;
	goal.innerHTML = "Goal:" + numGoal;
	goal.classList.value = numGoal;
}

/*********************************************************************
** Function: numButtonClicked()
** Description: functionality when first button is clicked.
*********************************************************************/
function numButtonClicked(button) {
	//get value from the first clicked button & update turn info
	if (num1 === "" && num2 === "") {
		num1 = button.innerHTML;
		document.getElementById("turnInfo").innerHTML = "Select an operator";
		button.innerHTML = "";
		button.disabled = true;
	}else if (num1 !== "" && num2 === "") {
		//change num2 and update the button
		num2 = button.innerHTML;
		updateButton(button);
	} 
}


/*********************************************************************
** Function: operatorPressed()
** Description: funtionality when operator button is pressed
*********************************************************************/
function operatorPressed(button) {
	//get the math buttons and call the math button clicked function when clicked.
	operation = button.innerHTML;
	document.getElementById("turnInfo").innerHTML = "Select a number";
}

/*********************************************************************
** Function: getMathResult()
** Description: returns the math result of the operator and numbers
** pressed by the user.
*********************************************************************/
function getMathResult(operation) {
	//execute math depending on operation
	if (operation === "*") {
		return parseInt(num1) * parseInt(num2);
	}else if (operation === "+") {
		return parseInt(num1) + parseInt(num2);
	}else if (operation === "-") {
		return parseInt(num1) - parseInt(num2);
	}

	return 
}

/*********************************************************************
** Function: checkWin()
** Description: Checks if player wins the game.
*********************************************************************/
function checkWin(num){
	//get goal value from doc
	let goal = document.getElementById("goal").classList.value;
	
	//check if player wins or loses
	if (num == goal) {
		playerWins += 1;
		document.getElementById("turnInfo").innerHTML = "You Win";
		return true;
	}else if (movesLeft > 0 && num != goal) {
		movesLeft = movesLeft - 1;
		return false;
	}else if (movesLeft == 0 && num != goal){
		playerLosses += 1;
		document.getElementById("turnInfo").innerHTML = "Better Luck Next time";
		return false;
	}
}

/*********************************************************************
** Function: updateButton()
** Description: gets the result and updates buttton with result and 
** checks for winner. 
*********************************************************************/
function updateButton(button) {
	//get result
	let result = getMathResult(operation);

	//add it to the workspace
	let table = document.getElementById("workspace");
	let row = table.insertRow();
	let cell = row.insertCell();
	cell.innerHTML = num1 + " " + operation + " " + num2 + " = " + result;
	
	//changes button's value to result
	button.innerHTML = result;
	
	//checks fo win
	checkWin(result);

	//resets the nums and operation
	num1 = "";
	num2 = "";
	operation = "";

}

/*********************************************************************
** Function: clearTable()
** Description: Clears the workspace for the new game. 
*********************************************************************/
function clearTable() {
	//gets table and last row index
	let table = document.getElementById("workspace");
	let endRowIndex = table.rows.length;

	//deletes the row
	for (let i = 0; i < endRowIndex; i++) {
		table.deleteRow(i);
	}
}