


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
		require(["orionEditor"], function(editor){ window.orionEditor = editor;});
    }
});