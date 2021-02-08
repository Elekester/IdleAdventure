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
Game.version = 0.118;

/**
 * The target fps at which to run the game.
 * @type {number}
 */
Game.fps = 30;

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
function sample(arr, n = 1, rep = false) {
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
 * @param {function} [callback=()=>{}] - A function to be called after creating the element, but before appending the element. It will be passed the element.
 * @returns {HTMLElement} The node of the appended element.
 */
function appendNewElement(node, tagName, callback = () => {}) {
	let elem = document.createElement(tagName);
	callback(elem);
	node.appendChild(elem);
	return node.lastChild;
}

/******************************************************************************
 * Game Save Data
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
	/* Update logic variables. */
	Game.logicCount++;
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
	/* Update draw variables. */
	Game.drawCount++;
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
 * Called once the document is loaded.
 * @function
 */
Game.init = function() {
	/* Remove the 'load' event listener from window. */
	document.removeEventListener('DOMContentLoaded', Game.init);
	
	/* Logs to the console. */
	console.log('Howdy, I hope you\'ve enjoyed my game!');
	
	/* Update the topBar div. */
	e('topBarVersion').innerText = 'v' + Game.version.toFixed(3);
	
	/* Recreate the game div. */
	removeChildren('game');
	let frag = document.createDocumentFragment();
	
	/* Create the menu. */
	let menu = appendNewElement(frag, 'div', elem => {elem.id = 'menu'; elem.className = 'right';});
	
	let nav = appendNewElement(menu, 'div', elem => {elem.id = 'nav'; elem.classList.add('open');});
	let navAnchor = appendNewElement(nav, 'div', elem => {elem.id = 'navAnchor';});
	appendNewElement(navAnchor, 'div', elem => {elem.id = 'navStore'; elem.dataset.menu = 'menuStore'; elem.textContent = 'Store'; elem.classList.add('active');});
	appendNewElement(navAnchor, 'div', elem => {elem.id = 'navOptions'; elem.dataset.menu = 'menuOptions'; elem.textContent = 'Options';});
	appendNewElement(navAnchor, 'div', elem => {elem.id = 'navInfo'; elem.dataset.menu = 'menuInfo'; elem.textContent = 'Info';});
	
	let menuStore = appendNewElement(menu, 'div', elem => {elem.id = 'menuStore'; elem.classList.add('open');});
	appendNewElement(menuStore, 'div', elem => {elem.className = 'titleCentered'; elem.textContent = 'Heroes';});
	appendNewElement(menuStore, 'div', elem => {elem.id = 'heroesStoreAnchor';});
	
	let menuOptions = appendNewElement(menu, 'div', elem => {elem.id = 'menuOptions';});
	appendNewElement(menuOptions, 'div', elem => {elem.className = 'titleCentered'; elem.textContent = 'Settings';});
	appendNewElement(menuOptions, 'div', elem => {});
	
	let menuInfo = appendNewElement(menu, 'div', elem => {elem.id = 'menuInfo';});
	appendNewElement(menuInfo, 'div', elem => {elem.textContent = 'Idle Adventure is an open-source idle/clicker game for your web browser.'});
	
	appendNewElement(menu, 'div', elem => {elem.className = 'bottomPadding open';});
	
	/* Add Event Listeners for the nav menu. */
	let navElements = Array.from(navAnchor.children);
	let menuItems = Array.from(menu.children).slice(1,-1);
	
	/**
	 * This function makes 'this' div in the menu nav acitve and makes the other divs inactive. It then displays the correct menu.
	 * It is added to each div in the menu nav as a listener for when the div is clicked.
	 * @function
	 */
	Game.clickNavButton = function () {
		if (this.classList.contains('active')) {}
		else {
			/* Remove and add active class from nav elements. */
			for (elem in navElements) {navElements[elem].classList.remove('active');};
			this.classList.add('active');
			
			/* Remove and add open class from menu items. */
			for (elem in menuItems) {
				if (menuItems[elem].id === this.dataset.menu) menuItems[elem].classList.add('open');
				else menuItems[elem].classList.remove('open');
			}
		}
	}
	
	for (elem in navElements) {
		navElements[elem].addEventListener('click', Game.clickNavButton);
	}
	
	/* Create the main field. */
	let field = appendNewElement(frag, 'div', elem => {elem.id = 'field'; elem.className = 'middle';});
	appendNewElement(field, 'div', elem => {elem.id = 'buffsAnchor';});
	appendNewElement(field, 'div', elem => {elem.id = 'hordeAnchor';});
	appendNewElement(field, 'div', elem => {elem.id = 'heroesAnchor';});
	
	e('game').appendChild(frag);
	
	/* Test elements */
	for (let i = 0; i < 10; i++) {appendNewElement(e('heroesStoreAnchor'), 'div', elem => {elem.textContent = i;})};
	for (let i = 0; i < 10; i++) {appendNewElement(e('buffsAnchor'), 'div', elem => {elem.textContent = i;})};
	
	/* Load save data */
	Game.load();
	
	/* Initialize variables. */
	/** The time at which the game was loaded, as a Unix timestamp.
	 * @type {number}
	 */
	Game.startTime = Date.now();
	
	/** The current in-game time, as a Unix timestamp. This should be approximately equal to the real time. Updated by {@link Game.loop}.
	 * @type {number}
	 */
	Game.time = Game.startTime;
	
	/** The amount of frames behind the game's logic currently is. Updated by {@link Game.loop}.
	 * @type {number}
	 */
	Game.frameDelay = 0;
	
	/** The last time, as a Unix timestamp, that Game.logic() was called. Updated by {@link Game.logic}.
	 * @type {number}
	 */
	Game.logicTime = Game.startTime;
	
	/** How many times {@link Game.logic} has been called. Updated by {@link Game.logic}.
	 * @type {number}
	 */
	Game.logicCount = 0;
	
	/** The last time, as a Unix timestamp, that Game.draw() was called. Updated by {@link Game.draw}.
	 * @type {number}
	 */
	Game.drawTime = Game.startTime;
	
	/** How many times {@link Game.draw} has been called. Updated by {@link Game.draw}.
	 * @type {number}
	 */
	Game.drawCount = 0;
	
	/* Start the game loop. */
	Game.loop();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', Game.init);
else Game.init();
