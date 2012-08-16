/* ================================================================================
 * @license
 * Copyright (c) 2012, 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     Zachariah Moreno
 *     John J Barton
 *     John Arthorne
 *     Ken Walker
================================================================================ */

// https://code.google.com/p/chromium/issues/detail?id=135526

window.addEventListener('load', function onLoad() {
	console.log('Window is loaded.');
    setTimeout(loadJSAsync);

    function loadJSAsync() {
		require({
			paths: {
				text: '/orion.client/bundles/org.eclipse.orion.client.core/web/requirejs/text',
				i18n: '/orion.client/bundles/org.eclipse.orion.client.core/web/requirejs/i18n',
				domReady: '/orion.client/bundles/org.eclipse.orion.client.core/web/requirejs/domReady',
				orion: '/orion.client/bundles/org.eclipse.orion.client.editor/web/orion/',
				examples: '/orion.client/bundles/org.eclipse.orion.client.editor/web/examples'
			}
		});

		/* Original copy of embeddededitor.js is in orion.client/bundles/org.eclipse.orion.client.editor/web/examples/editor/embeddededitor.js - embeddededitor.js in root is a copy to fix path issues */
		require(["orionEditor"], function(editor){
			// Set a global value available to our devtools_page
			window.orionEditor = editor;
			// Signal our devtools_page that we are ready
			window.postMessage({}, "*");
		});
    }
});