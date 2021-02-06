/******************************************************************************
 * Idle Adventure is copyright (c) 2021-present Clayton Craig.
 * Idle Adventure is open-source, licensed under the MIT License. See LICENSE.md for more details.
 *
 * Welcome to main.js, I hope you find it well commented. I've used JSDoc where I could.
 *****************************************************************************/
 
/**
 * @namespace
 */
let Game = {};

/**
 * The version number of Idle Adventure.
 * @type {number}
 */
Game.version = 0.108;

/**
 * The target fps at which to run the game.
 * @type {number}
 */
Game.fps = 30;

/**
 * A constant used in computing the game's actual fps. This is used to compute the (N = Game.fps)-EMA of the game's spf.
 * @type {number}
 */
Game.alph = 2/(Game.fps+1) / 1000;

/******************************************************************************
 * Global Functions
 *
 * These functions are simple and used throughout main.js.
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
	let sample = [];
	if (rep) {for (let i = 0; i < n; i++) {
		sample.push(arr[Math.floor(Math.random()*arr.length)]);
	}} else {for (let i = 0; i < n; i++) {
		sample.push(arr[Math.floor(Math.random()*arr.length)]);
		arr = arr.filter(item => item !== sample[i]);
	}}
	return sample;
}

/**
 * This function creates an HTML element and appends it to another.
 * @param {HTMLElement} node - The parent node.
 * @param {string} tagName - Specifies the type of element to be created.
 * @param {function} callback - A function to be called after creating the element, but before appending the element. It will be passed the element.
 * @returns {HTMLElement} The node of the appended element.
 */
function appendNewElement(node, tagName, callback) {
	callback ??= function() {};
	let elem = document.createElement(tagName);
	callback(elem);
	node.appendChild(elem);
	return node.lastChild;
}

/******************************************************************************
 * Game
 *****************************************************************************/
/**
 * This function loads save data.
 * Called by {@link Game.init}.
 * @function
 */
Game.load = function() {
}

/**
 * This function saves save data.
 * @function
 */
Game.save = function() {
}

/******************************************************************************
 * Game Logic
 *****************************************************************************/
/**
 * This function performs the logic operations of the game.
 * Called by {@link Game.loop}.
 * @function
 */
Game.logic = function() {
	/* Compute the game's actual logic frames per second. */
	Game.lfps = 1/(1/Game.lfps + Game.alph*(Date.now() - Game.logicTime - 1000/Game.lfps));
	Game.logicTime = Date.now();
}

/******************************************************************************
 * Game Draw
 *****************************************************************************/
/**
 * This function draws the game.
 * Called by {@link Game.loop}.
 * @function
 */
Game.draw = function() {
	/* Compute the game's actual drawn frames per second. */
	Game.dfps = 1/(1/Game.dfps + Game.alph*(Date.now() - Game.drawTime - 1000/Game.dfps));
	Game.drawTime = Date.now();
}

/******************************************************************************
 * Game Loop
 *****************************************************************************/
/**
 * This function performs the main loop of the game and ensures that the game's logic accounts for the actual fps.
 * Called by {@link Game.init} and {@link Game.loop}.
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
 * Initializer
 *****************************************************************************/
/**
 * This function initializes Idle Adventure by recreating the webpage, adding event listeners, and calling {@link Game.loop} for the first time.
 * Called once the window is loaded.
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
	let frag = document.createDocumentFragment();
	
	/* Create the menu. */
	let menu = appendNewElement(frag, 'div', elem => {elem.id = 'menu'; elem.className = 'right';});
	
	let store = appendNewElement(menu, 'div', elem => {elem.id = 'store';});
	appendNewElement(store, 'div', elem => {elem.className = 'titleCentered'; elem.textContent = 'Heroes'});
	appendNewElement(store, 'div', elem => {elem.id = 'heroesStoreAnchor';});
	appendNewElement(menu, 'div', elem => {elem.className = 'bottomPadding'});
	
	/* Create the main field. */
	let field = appendNewElement(frag, 'div', elem => {elem.id = 'field'; elem.className = 'middle';});
	appendNewElement(field, 'div', elem => {elem.id = 'buffsAnchor';});
	
	e('game').appendChild(frag);
	
	/* Test elements */
	for (let i = 0; i < 10; i++) {appendNewElement(e('heroesStoreAnchor'), 'div', elem => {elem.textContent = i;})};
	for (let i = 0; i < 10; i++) {appendNewElement(e('buffsAnchor'), 'div', elem => {elem.textContent = i;})};
	
	/* Add event listeners. */
	
	/* Load save data */
	Game.load();
	
	/* Initialize variables. */
	
	/** The amount of frames behind the game's logic currently is. Updated by {@link Game.loop}.
	 * @type {number}
	 */
	Game.frameDelay = 0;
	
	/** The current in-game time, as a Unix timestamp. This should be approximately equal to the real time. Updated by {@link Game.loop}.
	 * @type {number}
	 */
	Game.time = Date.now();
	
	/** The last time, as a Unix timestamp, that Game.logic() was called. Updated by {@link Game.logic}.
	 * @type {number}
	 */
	Game.logicTime = Date.now();
	
	/** The last time, as a Unix timestamp, that Game.draw() was called. Updated by {@link Game.draw}.
	 * @type {number}
	 */
	Game.drawTime = Date.now();
	
	/** The game's actual logic frames per second. Updated by {@link Game.logic}.
	 * @type {number}
	 */
	Game.lfps = Game.fps;
	
	/** The game's actual drawn frames per second. Updated by {@link Game.draw}.
	 * @type {number}
	 */
	Game.dfps = Game.fps;
	
	/* Start the game loop. */
	Game.loop();
}

window.addEventListener('load', Game.init);
