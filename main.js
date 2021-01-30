/******************************************************************************
 * Idle Adventure is copyright (c) 2021-present Clayton Craig.
 * Idle Adventure is open-source, licensed under the MIT License. See LICENSE.md for more details.
 *
 * Welcome to main.js, I hope you find it well commented. I've used JSDoc where I could, though I'm using jaguarjs-jsdoc which requires a few hacks to get everything working.
 *****************************************************************************/
 
/**
 * @namespace
 */
var Game = {};

/**
 * The version number of Idle Adventure.
 * @type {number}
 */
Game.version = 0.080;

/**
 * The target fps at which to run the game.
 * @type {number}
 */
Game.fps = 30;

/******************************************************************************
 * Library of Functions
 *
 * These functions are simple and used throughout main.js.
 *****************************************************************************/

/**
 * This function returns the DOM element with the given id.
 * @global
 * @param {string} str - The name of the id.
 * @returns {HTMLElement} The element with the given id.
 */
function e(str) {return document.getElementById(str);}

/**
 * This function removes all child nodes from a given element.
 * @global
 * @param {(HTMLElement|string)} node - The element or the id of an element, from which to remove all child nodes.
 */
function removeChildren(node) {if (typeof node === 'string') node = e(node); while (node.firstChild) node.removeChild(node.firstChild);}

/**
 * This function samples an array with or without replacement.
 * @global
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

/**
 * This function creates an HTML element and appends it to another.
 * @global
 * @param {HTMLElement} node - The parent node.
 * @param {string} tagName - Specifies the type of element to be created.
 * @param {function} callback - A function to be called after creating the element, but before appending the element. 'this' is bound to the child element in the callback.
 * @returns {HTMLElement} The node of the appended element.
 */
function appendNewElement(node, tagName, callback) {
	callback ??= function() {};
	var elem = document.createElement(tagName);
	callback.bind(elem)();
	node.appendChild(elem);
	return node.lastChild;
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
 * Initializer
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
	e('topBarVersion').innerText = 'v' + Game.version.toFixed(3);
	
	/* Recreate the game div. */
	removeChildren('game');
	var frag = document.createDocumentFragment();
	store = appendNewElement(frag, 'div', function() {this.id='store'; this.className = 'right';});
	appendNewElement(store, 'div', function() {this.className = 'title'; this.textContent = 'Heroes'});
	appendNewElement(store, 'div', function() {this.id = 'heroesStoreAnchor';});
	field = appendNewElement(frag, 'div', function() {this.id = 'field'; this.className = 'middle';});
	appendNewElement(field, 'div', function() {this.id = 'buffsAnchor';});
	e('game').appendChild(frag);
	
	/* Test elements */
	for (var i = 0; i < 10; i++) {appendNewElement(e('heroesStoreAnchor'), 'div');};
	for (var i = 0; i < 50; i++) {appendNewElement(e('buffsAnchor'), 'div');};
	
	/* Add event listeners. */
	
	/* Initialize variables for Game.loop(). */
	Game.frameDelay = 0;
	Game.time = Date.now();
	
	/* Load save data */
	
	/* Start the game loop. */
	Game.loop();
}

window.addEventListener('load', Game.init);
