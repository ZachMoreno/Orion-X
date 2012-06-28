#Orion Panel Notes
By: Zachariah Moreno

##Try Devtools-Save
	1.	https://code.google.com/p/devtools-save/
	2.	Installed & Activated in Chrome Canary
	3.	Having difficulty providing local path in options
			* Pulled down local copy of zachariahmoreno.com (looks like devtools-save wants a specific web path & corresponding local path)
			* Changed remote path to http://www.zachariahmoreno.com & local path to /Users/xachmoreno/Sites/zachariahmoreno.com/
			* ERROR - missing .allow-devtools-save file in path from file to root
	1.	added empty .allow-devtools-save file to local directory
	2.	
	3.	SUCCESS
	3.	Building DevTools-Save
	1.	Install Depot Tools
	1.	Cloned Depot Tools into desktop/git-clones
	2.	Add Depot Tools to $PATH variable - Help
	1.	Terminal - touch ~/.bash_profile; open ~/.bash_profile
	2.	Added export PATH="$PATH":`pwd`/depot_tools to bottom & saved
	3.	Ran source ~/.bash_profile
	4.	Ran echo $PATH retruned /opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/local/sbin:/opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/local/sbin:/opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/X11/bin:/usr/local/git/bin:/Users/xachmoreno/desktop/git-clones/depot_tools
	5.	SUCCESS
	3.	gclient.py config = Permission Denied
	4.	config = usage: config [ -bcdo dir ] [ -p ] sysname
	5.	Help - chmod a+x /Users/xachmoreno/Desktop/git-clones/depot_tools/gclient.py  = usage: config [ -bcdo dir ] [ -p ] sysname
	6.	John Barton - gclient config http://devtools-save.googlecode.com/svn/trunk --name src 
	7.	Help - .bashrc does not exist on Mac, create one and put export PATH="$PATH":`pwd`/depot_tools in it
	8.	
	9.	STRARTING OVER
	1.	Install Depot Tools
	2.	SUCCESS
	3.	
	4.	
	2.	obtain devtools-save.pem (or use your own key if you're just hacking) - skipped
	3.	
Create DevTools Panel
	1.	http://code.google.com/chrome/extensions/manifest.html
	2.	http://code.google.com/chrome/extensions/devtools.panels.html
	3.	created manifest.json
	1.	included "devtools_page": "devtools.html"
	4.	created devtools.html
	1.	included script src="devtools.js"
	5.	created devtools.js
	1.	included chrome.devtools.panels.create( "Orion", "dark-orion-24x24.png", "panel.html", function(panel) {  });
	1.	console: Uncaught SyntaxError: Unexpected token function devtools.html:13
	2.	Removed function(panel) {  }
	1.	SUCCESS
	6.	Updated Milestone
Embed Orion
	1.	http://aniefer.blogspot.com/2011/02/embedding-orion-editor_02.html
	2.	http://orioneditor.blogspot.com/2012/01/using-orion-editor-with-almond.html
	3.	Working in panel.html
	1.	included script data-main="orionformatter" src="orionformatter.js" from Gist
	2.	included script src="require.js" from http://requirejs.org/docs/download.html#requirejs
	3.	included require({"orionformatter"});
	4.	 
	5.	 
	6.	changed data-main to orionformatter
	7.	updated define() statement with my file structure
	4.	Created embed-test directory to abstract embedding the orion editor
	1.	set baseURL to '../embed-test'
	2.	console: Failed to load resource i18n.js
	1.	included i18n.js in root
	2.	error fixed
	3.	Uncaught Error: NETWORK_ERR: XMLHttpRequest Exception 101 (util.js: line 22)
	1.	http://www.chromium.org/developers/how-tos/run-chromium-with-flags
	2.	Terminal Command Zach-Morenos-MacBook-Pro:~ xachmoreno$ /applications/google\ chrome\ canary.app/contents/macos/google\ chrome\ canary --remote-debugging-port=9222
	3.	Terminal Responce terminate called throwing an exceptionAbort trap: 6
	4.	ABANDONED
	4.	moved embed-test to http://www.zachariahmoreno.com/portfolio/embed-test because XMLHttpRequest errors are likely caused by called files locally instead of on a web server - source
	5.	double checked that I have the latest verision on i18n.js - CURRENT
	6.	double checked that I have the latest veriosn of orion.client - OLD
	1.	downloaded eclipse-orion-0.5M1-macosx.cocoa.x86_64.zip
	2.	pulled out downloads/eclipse/plugins/org.eclipse.orion.client.editor_0.1.0.v20120412-2022/web/orion
	3.	swapped with http://www.zachariahmoreno.com/portfolio/embed-test/orion (OLD VERSION)
	7.	updated orionformatter.js
	1.	updated define() method
	8.	Console Failed to Load resource orion/textview/nls/en-us/messages.js - file did not exist
	9.	duplicated messages.js > created en-us folder > moved messages.js into en-us folder
	1.	NO CONSOLE ERRORS
	10.	i18n.js stops on line 133 because require.mixin() method returns UNDEFINED
	1.	triple checked my version on i18n.js, replaced live copy with copy from /Users/xachmoreno/Downloads/eclipse/plugins/org.eclipse.orion.client.core_0.2.0.v20120413-2137/web/requirejs - same error
	2.	in orionformatter.js I added i18n to the define() method
	1.	NO ERRORS
	11.	hard coded CSS references into index.html
	1.	demo code snippet flashing for 1 second then disappearing
	2.	asked John Barton, he said to try setting height
	12.	set height on editor container
	13.	SUCCESS
	5.	Move embeded Orion into orion.panel/panel.html
	1.	Orion Server API
	1.	Preference API
	2.	File API
	3.	Workspace API
	4.	Transfer API
	5.	Git API
	6.	User API
	7.	Site Configuration API
	2.	Forked Eclipse/Orion.Server on GitHub
	1.	Began reading docs in orion.server/doc/org.eclipse.orion.doc.isv/WikiDoc/Orion
	3.	SET ASIDE & MOVED ON
	6.	Embed local Orion within panel.html
	1.	Downloaded latest copy of Orion for Mac & put it in the orion-0.4-mac folder
	1.	StackOverFlow - NPAPI PlugIn
	2.	Chrome NPAPI PlugIn Extension Docs
	3.	Mozilla PlugIns
	4.	Gecko NPAPI Docs
	5.	"NO NPAPI, assume Orion is running" - John Barton
	2.	Downloaded latest copy of Orion for Windows & put it in the orion-0.4-win folder
	1.	Launch .exe with JavaScript
	2.	FileSystemObject
	3.	Downloaded latest copy of Orion for Linux & put it in the orion-0.4-lnx folder
	4.	Used iframe to embed full orion local - src="http://localhost:8080"
	1.	SUCCESS
	2.	ABANDONED
	7.	Created & switched to 'embedded' branch & removed full copies of Orion
	8.	Copied structure & code from embed-test to root of orion-panel
	9.	Updated paths in panel.html & orionformatter.js to support new structure
	10.	SUCCESS
	1.	Updated Milestones
Pull in client side code
	1.	http://code.google.com/chrome/extensions/debugger.html
	2.	https://developers.google.com/chrome-developer-tools/docs/remote-debugging#extension
	3.	http://code.google.com/chrome/extensions/samples.html#8f52a8a59c6fc16cb0d1ed0680b7f005be033d58
	4.	HTML5 Local Storage tutorial
	5.	chrome.contextMenus
	6.	Created js/getdocs.js
	1.	chrome.DOM.getDocument
	2.	Remote DOM Modifications - Pavel Feldman
	7.	fixed require baseURL issue
	8.	updated manifest to version 2 & removed background.html
	9.	manifest v2 breaks orion.client - changed back to v1 & filed issue #3
	10.	moved min chrome version to 19
	11.	created getDocs branch
	1.	chrome.devtools.getResources example
	2.	copied code from example into getdocs.js - removed .experimental.
	3.	Docs
	1.	Uncaught TypeError: Cannot read property 'inspectedWindow' of undefined
	2.	chrome.devtools.inspectedWindow.getResources is not in experimental (list of experimental APIs)
	3.	Asked for help on IRC #chromium-extensions
	1.	attempted copying code from getdocs.js & pasted it in panel.html, devtools.html, & devtools.js
	2.	SAME ERROR
	4.	Undocked DevTools, opened Orion panel, opened another DevTools window, console is logging resources of inspected window
	5.	SUCCESS
	4.	added resources.getContent() to getResource()
	1.	Uncaught TypeError: Object [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] has no method 'getContent' - getdocs.js:13
	5.	Updated Milestone dates
	12.	Both should work, once you 1) call the set...() handler and 2) change the selector in the config panel. All link clicks then land in your panel
Enhancements
	1.	Google Play Tabs
	2.	Embed Adobe Brackets editor (code mirror)
	3.	Integrate collaborative real-time editing (Operation Transform)
	1.	Wikipedia - Operational Tranform
	2.	Understanding & Applying Operatonal Transform
	3.	StackOverflow - Operation Transform Library?
	4.	Google Diff-Match-Patch API
	5.	 
	6.	 
	4.	Leverage Chrome's OAuth sign in for saving sftp credentials
	5.	chop style code review messages
	6.	contributor diff like MS Word Track Changes
	7.	extend editor API to Web Components
Resources
	1.	Contributing to Chrome Developer Tools - Pavel Feldman
