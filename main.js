/******************************************************************************
 * Idle Adventure 
 *
 * Welcome to main.js ('https://youtu.be/itzaF8ctR2M?t=3'), I hope you find it well commented.
 *****************************************************************************/
 
/**
 * This is Idle Adventure.
 * @namespace
 */
var Game = {};

Game.version = 0.048; /* This shiould roughly correspond to the number of commits to the repository on GitHub/1000. */
Game.fps = 30;

/******************************************************************************
 * Library of Functions
 *
 * These functions are simple and used throughout the document.
 *****************************************************************************/

/**
 * This function returns the DOM element with the given id.
 * @param {string} str - The name of the id.
 * @returns {HTMLElement} The element with the given id.
 */
function e(str) {return document.getElementById(str);}

/**
 * This function removes all child nodes from a given element.
 * @param {(HTMLElement|string)} node - The element or the id of an element, from which to remove all child nodes.
 */
function removeChildren(node) {if (typeof node === 'string') node = e(node); while (node.firstChild) node.removeChild(node.firstChild);}

/**
 * This function samples an array with or without replacement.
 * @param {Array} arr - An array to sample.
 * @param {number} [n=1] - The sample size.
 * @param {boolean} [rep=false] - Sample with replacement (true) or without (false).
 * @returns {Array} A random sample of arr with sample size n.
 */
function sample(arr, n, rep) {
	n ??= 1;
	rep ??= false;
	var sample = [];
	if (rep) {for (var i = 0; i < n; i++) {
		sample.push(arr[Math.floor(Math.random()*arr.length)]);
	}} else {for (var i = 0; i < n; i++) {
		sample.push(arr[Math.floor(Math.random()*arr.length)]);
		arr = arr.filter(item => item !== sample[i]);
	}}
	return sample;
}

/******************************************************************************
 * Game Loop
 *****************************************************************************/
/**
 * This function performs the main loop of the game and ensures that the game's logic accounts for the actual fps.
 * @function
 */
Game.loop = function() {
	/* Perform game logic and catch up on any missed logic frames. */
	Game.logic();
	const now = Date.now();
	Game.frameDelay += (now - Game.time)*Game.fps/1000 - 1;
	for ({}; Game.frameDelay > 0; Game.frameDelay--) Game.logic();
	Game.time = now;
	
	/* Draw a new frame. */
	Game.draw();
	
	/* Call the loop again after one frame. */
	setTimeout(Game.loop, 1000/Game.fps);
}

/******************************************************************************
 * Game Logic
 *****************************************************************************/
/**
 * This function performs the logic operations of the game.
 * @function
 */
Game.logic = function() {
}

/******************************************************************************
 * Game Draw
 *****************************************************************************/
/**
 * This function draws the game.
 * @function
 */
Game.draw = function() {
}

/******************************************************************************
 * Launcher
 *****************************************************************************/
/**
 * This function initializes Idle Adventure by recreating the webpage, adding event listeners, and calling Game.loop().
 * @function
 */
Game.init = function() {
	/* Remove the 'load' event listener from window. */
	window.removeEventListener('load', Game.init);
	
	/* Logs to the console. */
	console.log('Howdy, I hope you\'ve enjoyed my game!');
	
	/* Update the topBar div. */
	e('topBarVersion').innerText = 'v. ' + Game.version;
	
	/* Recreate the game div. */
	removeChildren('game');
	var frag = document.createElement('div');
	frag.id = 'gameLoading';
	var div = document.createElement('div');
	div.className = 'title';
	div.innerText = 'Thank you!\nBut our game is in another castle!';
	frag.appendChild(div);
	div = document.createElement('div');
	div.innerText = 'I\'m learning everything as I make Idle Adventure, so bear with me while I do so. Check back in a couple of weeks.'
	frag.appendChild(div);
	e('game').appendChild(frag);
	
	/* Add event listeners. */
	
	/* Initialize variables for Game.loop(). */
	Game.frameDelay = 0;
	Game.time = Date.now();
	
	/* Start the game loop. */
	Game.loop();
}

window.addEventListener('load', Game.init);
