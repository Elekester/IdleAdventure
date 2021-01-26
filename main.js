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
	console.log('Howdy!');
}