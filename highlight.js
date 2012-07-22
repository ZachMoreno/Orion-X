define([
	"orion.client/bundles/org.eclipse.orion.client.core/web/requirejs/require",
	"examples/textview/textStyler",
	"orion/editor/textMateStyler",
	"orion/editor/htmlGrammar" ],

	function(require, mTextStyler, mTextMateStyler, mHtmlGrammar){
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
		return syntaxHighlighter;
	});