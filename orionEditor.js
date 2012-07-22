/*******************************************************************************
 * @license
 * Copyright (c) 2010, 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*global examples orion:true window define*/
/*jslint browser:true devel:true*/




define([
	"orion.client/bundles/org.eclipse.orion.client.core/web/requirejs/require",
	"orion/textview/textView",
	"orion/textview/keyBinding",
	"examples/textview/textStyler",
	"orion/editor/textMateStyler",
	"orion/editor/htmlGrammar",
	"orion/editor/editor",
	"orion/editor/editorFeatures",
	"orion/editor/contentAssist",
	"orion/editor/jsContentAssist",
	"orion/editor/cssContentAssist",
	"highlight"],

function(require, mTextView, mKeyBinding, mTextStyler, mTextMateStyler, mHtmlGrammar, mEditor, mEditorFeatures, mContentAssist, mJSContentAssist, mCSSContentAssist, mHighlight){
	
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
	
	/* =================================================
	moved syntaxHighlight.highlight(); to highlight.js
	================================================= */
	
	var annotationFactory = new mEditorFeatures.AnnotationFactory();

	function save(editor) {
		var url = editor.sourceName;
		var src = editor.getContent();
		RevisionControl.save(url, src);
		editor.setInput(null, null, null, true);
		/*
		** http://stackoverflow.com/questions/7717851/save-file-javascript-with-file-name
		uriContent = "data:application/octet-stream;filename=filename.txt," + encodeURIComponent(codeMirror.getValue());
		newWindow=window.open(uriContent, 'filename.txt');
		*/
		window.alert("Save hook.");
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
			console.log('Resource saved!');
			return true;
		});
		
		// speaking of save...
		document.getElementById("save").onclick = function() {save(editor);};

	};
		
	var dirtyIndicator = "";
	var status = "";
	
	var statusReporter = function(message, isError) {
		if (isError) {
			status =  "Orion editor ERROR: " + message;
		} else {
			status = message;
			console.log("Orion editor: "+ message);
		}
		document.getElementById("status").innerHTML = dirtyIndicator + contentName + '  ' + status;
		// window.selectedFileName doesn't works
	};
	
	var editor = new mEditor.Editor({
		textViewFactory: textViewFactory,
		undoStackFactory: new mEditorFeatures.UndoFactory(),
		annotationFactory: annotationFactory,
		lineNumberRulerFactory: new mEditorFeatures.LineNumberRulerFactory(),
		contentAssistFactory: contentAssistFactory,
		keyBindingFactory: keyBindingFactory,
		statusReporter: statusReporter,
		domNode: editorDomNode
	});
		
	editor.addEventListener("DirtyChanged", function(evt) {
		if (editor.isDirty()) {
			dirtyIndicator = "*";
		} else {
			dirtyIndicator = "";
		}
		document.getElementById("status").innerHTML = dirtyIndicator + status;
	});

	/* =================================================
	Initial editor
	================================================= */
	
	editor.installTextView();
	// if there is a mechanism to change which file is being viewed, this code would be run each time it changed.
	
	var contentName = "sample.js";  // for example, a file name, something the user recognizes as the content.
	var initialContent = "// Right-click on a file in the Resources panel & select Open with Orion\n\nconsole.log('this is some javascript code');";
	
	// placing name & content into editor
	// PARAMETERS (title, message, contents, contentsSaved)
	editor.setInput(contentName, null, initialContent);
	mHighlight.highlight(contentName, editor);
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

	return editor;
	
});