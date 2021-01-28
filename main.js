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

Game.version = 0.044; /* This shiould roughly correspond to the number of commits to the repository on GitHub/1000. */
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
 * @param {(HTMLElement|string)} node - The element from which to remove all child nodes.
 */
function removeChildren(node) {if (typeof node === 'string') node = e(node); while (node.firstChild) node.removeChild(node.firstChild);}

/******************************************************************************
 * Game Loop
 *****************************************************************************/
/**
 * This function performs the main loop of the game and ensures that the game's logic accounts for the actual fps.
 * @function
 */
Game.loop = function() {
	setTimeout(Game.loop, 1000/Game.fps);
}

/******************************************************************************
 * Launcher
 *****************************************************************************/
/**
 * This function initializes Idle Adventure in the following way: First, it removes the 'load' event listener from window; Second, it logs to the console; Third, it updates the topBar div; Fourth, it recreates the game div; Fifth, it adds event listeners; and Finally, it loads the game and calls Game.loop().
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
	var frag = document.createDocumentFragment();
	/* Do stuff with the fragment. */
	removeChildren(e('game'));
	e('game').appendChild(frag);
	
	/* Add event listeners. */
	
	Game.loop();
}

window.addEventListener('load', Game.init);
