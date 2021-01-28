/******************************************************************************
 * Idle Adventure 
 *
 * Welcome to main.js ('https://youtu.be/itzaF8ctR2M?t=3'), I hope you find it well commented.
 *****************************************************************************/
 
 /**
 * Idle Adventure
 * @namespace
 */
var Game = {};

Game.Version = 0.027; /* This shiould roughly correspond to the number of commits to the repository on GitHub/1000. */

/******************************************************************************
 * Library of Functions
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
 * @param {(HTMLElement|string)} node - The element from which to remove all child nodes.
 */
function removeChildren(node) {if (typeof node === 'string') node = e(node); while (node.firstChild) node.removeChild(node.firstChild);}

/******************************************************************************
 * Launcher
 *****************************************************************************/
Game.init = function() {
	/* Remove the event listener */
	window.removeEventListener('load', Game.init);
	
	/* Log to the console. */
	console.log('Howdy, I hope you\'ve enjoyed my game!');
	
	/* Update the topBar div. */
	e('topBarVersion').innerText = 'v. ' + Game.Version;
	
	/* Recreate the game div. */
	var frag = document.createDocumentFragment();
	/* Do stuff with the fragment. */
	removeChildren(e('game'));
	e('game').appendChild(frag);
}

window.addEventListener('load', Game.init);
