/******************************************************************************
 * Welcome to main.js ('https://youtu.be/itzaF8ctR2M?t=3'), I hope you find it well commented.
 *****************************************************************************/

/******************************************************************************
 * The Library of Functions
 *
 * These functions are simple and used throughout the document.
 *****************************************************************************/

/**
 * This function returns the DOM element with the given id.
 * @param {string} str - The name of the id.
 * @returns {HTMLElement} - The element with the given id.
 */
function e(str) {return document.getElementById(str);}

/**
 * This function removes all child nodes from a given element.
 * @param {HTMLElement} node - The element from which to remove all child nodes.
 */
function removeChildren(node) {while (node.firstChild) {node.removeChild(node.firstChild);}}

/**
 * This function logs a message to the console after making it rainbow colored.
 * @param {string} message - The message to be logged.
 */
function consoleRainbow(message) {
	var newMessage = '';
	for (i = 0; i < message.length; i++) {
		newMessage += '%c' + message.slice(i, i+1);
	}
	
	var rainbowMessage = [newMessage];
	for (i = 0; i < message.length; i++) {
		if (i%7 == 0) rainbowMessage.push('color: red');
		if (i%7 == 1) rainbowMessage.push('color: orange');
		if (i%7 == 2) rainbowMessage.push('color: yellow');
		if (i%7 == 3) rainbowMessage.push('color: green');
		if (i%7 == 4) rainbowMessage.push('color: blue');
		if (i%7 == 5) rainbowMessage.push('color: indigo');
		if (i%7 == 6) rainbowMessage.push('color: violet');
	}
	
	console.log.apply(null, rainbowMessage);
}

/******************************************************************************
 * The Game.
 *****************************************************************************/

/**
 * Idle Adventure
 * @namespace
 */
var Game = {};

Game.Version = 0.014;

/******************************************************************************
 * Launcher
 *****************************************************************************/

window.onload = function() {
	/* Update the topBar div. */
	e('topBarVersion').innerText = 'v. ' + Game.Version;
	
	/* Recreate the game div. */
	var frag = document.createDocumentFragment();
	/* Do stuff with the fragment. */
	removeChildren(e('game'));
	e('game').appendChild(frag);
		
	/* Log to the console. */
	consoleRainbow('Howdy!');
}