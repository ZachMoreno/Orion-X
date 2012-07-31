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

// watch when resource contents are committed
chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
	console.log('resource content committed', resource, content);
});

// create the Orion panel
chrome.devtools.panels.create('Orion', 'img/orion32.png', 'panel.html', function(panel) {
	console.log('panel',JSON.stringify(panel),panel);


	var res      = null,
		buffer   = null,
		editorInterface;

	function setEditor(panel_window) {
		editorInterface = panel_window.orionEditor;
		console.log('setEditor', editorInterface);
		if (buffer) {
			console.log('loading buffer');
			load(buffer.content, buffer.line);
			buffer = null;
		}
	}

    function onPanelWindowReady(panel_window) {
		setEditor(panel_window);
    }

    var firstRun = true;
    function onPanelShown(panel_window) {
      if (firstRun) {
		panel_window.addEventListener('message', onPanelWindowReady.bind(null, panel_window));
		firstRun = false;
      }
    }

	panel.onShown.addListener(onPanelShown);

	// load resource code into the editor
	function load(content, type, line) {
		if (editorInterface) {
			// Doin' work in orionEditor.js
			editorInterface.setInput(resURL, null, resContent, null);
		} else {
			buffer = {content:content, type:type, line:line};
			console.log('buffering load', buffer);
		}
	}

	// commit changes made to resource code
	function save() {
		if (editorInterface) {
			var content = editorInterface.getContent();
			console.log('saving', content);
			res.setContent(content, true, function(status){
				if (status && status.isError) console.error('Couldn\'t save Resource:', status);
				else console.log('Resource saved!');
			});
		}
	}
	

	// listen to breakpoint events from the extension API
	/*
	chrome.devtools.onSetBreakpoint(line) {
		if (editor) editor.setBreakpoint(line);
	}

	chrome.devtools.onUnsetBreakpoint(line) {
		if (editor) editor.unsetBreakpoint(line);
	}

	*/



	// use Orion panel to open resources
	chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {
		console.log('open resource', resource, resource.url, resource.type, line);

		res     = resource;
		resURL	= resource.url;
		resType = resource.type;
		resLine = line;
		res.getContent(function(content, encoding) {
			resContent = content;
			console.log('encoding', encoding);
			load(editorInterface.setContent(resURL, resContent, resType, resLine));
		});

		panel.show();
	});


	// Save-to-Orion

	chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function saveToOrion(resource) {
		resource.getContent(function onContent(content, encoding) {
			console.log("saveToOrion, getContent "+resource.url, content);
			var request = { message: "saveResource", url: resource.url, content: content, encoding: encoding };
			var responseHandler = function(response) {
				console.log("saveResource response", response);
			};
			chrome.extension.sendRequest(request, responseHandler);
		});
		console.log("saveToOrion, issued getContent "+resource.url);
	});


	// as panels load lazily, grab the editor when it's ready
	panel.onShown.addListener(function(window) {
		if (!editorInterface) {
			editorInterface.onSetBreakpoint = setBreakpoint;
			editorInterface.onUnsetBreakpoint = unsetBreakpoint;
		}
		if (buffer) {
			console.log('loading buffer');
			load(buffer.content, buffer.line);
			buffer = null;
		}
	});
	

	// wire WebInspector search bar to the editor
	panel.onSearch.addListener(function(action, query) {
		console.log('search',action,query);
		if (editorInterface) {
			editorInterface.search(action, query);
		}
	});

	// SAVE button on status bar
	// var buttonsave = panel.createStatusBarButton('img/orion16.png', 'Save', false);
	// buttonsave.onClicked.addListener(save);

});




