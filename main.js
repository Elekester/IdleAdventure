var Game = {};
Game.Version = 0.004;

/** This function returns the DOM element with the given id.
 * @param {string} str - The name of the id.
 * @returns {HTMLElement} - The element with the given id.
 */
function e(str) {return document.getElementById(str);}

/**
 * This function removes all child nodes from a given element.
 * @param {HTMLElement} parent - The element from which to remove all child nodes.
 */
function removeChildren(parent) {while (parent.firstChild) {parent.removeChild(parent.firstChild);}}

window.onload = function() {
	/* Update the topBar div. */
	e('topBarVersion').innerText = 'v. ' + Game.Version;
	
	/* Recreate the game div. */
	var frag = document.createDocumentFragment();
	/* Do stuff with the fragment. */
	removeChildren(e('game'));
	e('game').appendChild(frag);
}