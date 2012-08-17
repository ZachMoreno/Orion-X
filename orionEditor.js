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
/*global examples orion:true window define*/
/*jslint browser:true devel:true*/

define([
	"orion.client/bundles/org.eclipse.orion.client.core/web/requirejs/require",
	// jsLint
	"orion.client/bundles/org.eclipse.orion.client.core/web/orion/jslintPlugin",
	"orion.client/bundles/org.eclipse.orion.client.core/web/orion/jslintworker",
	"orion/textview/textView",
	"orion/textview/keyBinding",
	"examples/textview/textStyler",
	"orion/editor/textMateStyler",
	"orion/editor/htmlGrammar",
	"orion/editor/editor",
	"orion/editor/editorFeatures",
	"orion/editor/contentAssist",
	"orion/editor/jsContentAssist",
	"orion/editor/cssContentAssist"],

function(require, mJSLintPlugin, mJSLintWorker, mTextView, mKeyBinding, mTextStyler, mTextMateStyler, mHtmlGrammar, mEditor, mEditorFeatures, mContentAssist, mJSContentAssist, mCSSContentAssist){
	
	var editorDomNode = document.getElementById("orion");
	
	var textViewFactory = function() {
		return new mTextView.TextView({
			parent: editorDomNode,
			tabSize: 4
		});
	};

	var contentAssist;
	var contentAssistFactory = {
		createContentAssistMode: function(editor) {
			contentAssist = new mContentAssist.ContentAssist(editor.getTextView());
			var contentAssistWidget = new mContentAssist.ContentAssistWidget(contentAssist, "contentassist");
			return new mContentAssist.ContentAssistMode(contentAssist, contentAssistWidget);
		}
	};
	var cssContentAssistProvider = new mCSSContentAssist.CssContentAssistProvider();
	var jsContentAssistProvider = new mJSContentAssist.JavaScriptContentAssistProvider();
	
	// Canned highlighters for js, java, and css. Grammar-based highlighter for html
	var syntaxHighlighter = {
		styler: null,
		
		highlight: function(fileName, editor) {
			if (this.styler) {
				this.styler.destroy();
				this.styler = null;
			}
			if (fileName) {
				var splits = fileName.split(".");
				var extension = splits.pop().toLowerCase();

				if (extension === 'js') {
					console.log('EXTENSION: JavaScript');
				} else if (extension === 'html') {
					console.log('EXTENSION: HTML');
				} else if (extension === 'css') {
					console.log('EXTENSION: CSS');
				} else if (extension === 'java') {
					console.log('EXTENSION: Java');
				} else {
					console.error('EXTENSION: Unknown');
				}

				var textView = editor.getTextView();
				var annotationModel = editor.getAnnotationModel();
				if (splits.length > 0) {
					switch(extension) {
						case "js":
						case "java":
						case "css":
							this.styler = new mTextStyler.TextStyler(textView, extension, annotationModel);
							break;
						case "html":
							this.styler = new mTextMateStyler.TextMateStyler(textView, new mHtmlGrammar.HtmlGrammar());
							break;
					}
				}
			}
		}
	};
	
	var annotationFactory = new mEditorFeatures.AnnotationFactory();

	function save(editor) {
		var url = editor.sourceName;
		var src = editorInterface.getContents();
		editor.setInput(null, null, null, true);
		window.alert("Save is currently on our TODO list");
		if (!src) {
			console.error('SAVE UNSUCCESSFUL');
		} else {
			console.log('SAVE SUCCESSFUL ' + src);
		}
	}

	/*
	function prettyPrint(content) {
		window.alert("Pretty Print");
	}
	*/

	function newFile() {
		window.alert("New File is currently on our TODO list");
	}
	
	var keyBindingFactory = function(editor, keyModeStack, undoStack, contentAssist) {
		
		// Create keybindings for generic editing
		var genericBindings = new mEditorFeatures.TextActions(editor, undoStack);
		keyModeStack.push(genericBindings);
		
		// create keybindings for source editing
		var codeBindings = new mEditorFeatures.SourceCodeActions(editor, undoStack, contentAssist);
		keyModeStack.push(codeBindings);
		
		// save binding
		editor.getTextView().setKeyBinding(new mKeyBinding.KeyBinding("s", true), "save");
		editor.getTextView().setAction("save", function(){
				save(editor);
				return true;
		});
		
		// speaking of save...
		document.getElementById("save").onclick = function() {save(editor);};

		// document.getElementById("prettyprint").onclick = function() {prettyPrint();};

		document.getElementById("create").onclick = function() {newFile();};

	};
		
	var dirtyIndicator = "";
	var status = "";
	
	var statusReporter = function(message, isError) {
		if (isError) {
			status =  "Orion editor ERROR: " + message;
		} else {
			status = message;
			console.log("Orion editor: "+ message + " " + dirtyIndicator);
		}
		document.getElementById("status").innerHTML = "<h2>" + dirtyIndicator + "<strong>" + contentName + "</strong> - " + '  ' + status + '</h2>';
	};
	
	var editor = new mEditor.Editor({
		textViewFactory: textViewFactory,
		undoStackFactory: new mEditorFeatures.UndoFactory(),
		annotationFactory: annotationFactory,
		lineNumberRulerFactory: new mEditorFeatures.LineNumberRulerFactory(),
		contentAssistFactory: contentAssistFactory,
		keyBindingFactory: keyBindingFactory,
		statusReporter: statusReporter,
		domNode: editorDomNode,

		setMarker: function(line, marker) {
			console.error("TODO");
		},

		clearMarker: function(line) {
			console.error("TODO");
		}
	});
		
	editor.addEventListener("DirtyChanged", function(evt) {
		if (editor.isDirty()) {
			dirtyIndicator = "*";
		} else {
			dirtyIndicator = "";
		}
		document.getElementById("status").innerHTML = dirtyIndicator + status;
	});
	
	// this code runs each time content is changed
	editor.installTextView();
	
	// file name
	var contentName = "instructions.html";
	// content
	var initialContent = "<!--\n	Select settings > Open links in > Orion-X\n\n	Click any link in the Elements panel to edit with Orion-X\n		or\n	Right-click on a file in the Resources panel & select Open with Orion-X \n-->";

	// PARAMETERS (title, message, contents, contentsSaved)
	editor.setInput(contentName, null, initialContent);
	syntaxHighlighter.highlight(contentName, editor);
	editor.highlightAnnotations();
	contentAssist.addEventListener("Activating", function() {
		if (/\.css$/.test(contentName)) {
			contentAssist.setProviders([cssContentAssistProvider]);
		} else if (/\.js$/.test(contentName)) {
			contentAssist.setProviders([jsContentAssistProvider]);
		}
	});
	// end of code to run when content changes.
	
	window.onbeforeunload = function() {
		if (editor.isDirty()) {
			return "There are unsaved changes.";
		}
	};

	// from what I can tell, orion plugins don't work with the embedded orion editor
	// var jslint = mJSLintPlugin.jslint(resContent);

	// editorInterface makes editor API available to orion.js
	var editorInterface = {
		search: function(action, query) {
			var cursor = editor.getSearchCursor(query, null, true);
			cursor.findNext();
		},

		save: function(editor) {
			save(editor);
		},

		getContents: function() {
			console.error('TODO');
		},

		// set and unset breakpoints with the extension API
		setBreakpoint: function(line) {
			editor.setMarker(line, marker);
		},

		unsetBreakpoint: function(line) {
			editor.clearMarker(line);
		},

		// changing content
		setContent: function(resURL, resContent, resType, resLine) {
			console.log('LOADING: ' + resURL + '\n' + resContent + '\n' + resType + '\n' + resLine);
			editor.setInput(resURL, null, resContent, null);
			syntaxHighlighter.highlight(resURL, editor);
			contentName = resURL;
			editor.highlightAnnotations();
			// this.contentAssist(resURL);
		}
	};

	return editorInterface;  // clients will get an object that acts like an abstract editor
	
});
