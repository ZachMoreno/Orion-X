# Orion Panel Notes
By: Zachariah Moreno

## Try Devtools-Save
1. https://code.google.com/p/devtools-save/
2. Installed & Activated in Chrome Canary
3. Having difficulty providing local path in options
4. Pulled down local copy of zachariahmoreno.com (looks like devtools-save wants a specific web path & corresponding local path)
5. Changed remote path to http://www.zachariahmoreno.com & local path to /Users/xachmoreno/Sites/zachariahmoreno.com/
6. ERROR - missing .allow-devtools-save file in path from file to root
7. added empty .allow-devtools-save file to local directory
8. SUCCESS
9. Building DevTools-Save
10. Install Depot Tools
11. Cloned Depot Tools into desktop/git-clones
12. Add Depot Tools to $PATH variable - Help
13. Terminal - touch ~/.bash_profile; open ~/.bash_profile
14. Added export PATH="$PATH":`pwd`/depot_tools to bottom & saved
15. Ran source ~/.bash_profile
16. Ran echo $PATH retruned /opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/local/sbin:/opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/local/sbin:/opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/X11/bin:/usr/local/git/bin:/Users/xachmoreno/desktop/git-clones/depot_tools
17. SUCCESS
18. gclient.py config = Permission Denied
19. config = usage: config [ -bcdo dir ] [ -p ] sysname
20. Help - chmod a+x /Users/xachmoreno/Desktop/git-clones/depot_tools/gclient.py  = usage: config [ -bcdo dir ] [ -p ] sysname
21. John Barton - gclient config http://devtools-save.googlecode.com/svn/trunk --name src 
22. Help - .bashrc does not exist on Mac, create one and put export PATH="$PATH":`pwd`/depot_tools in it
23. STRARTING OVER
24. Install Depot Tools
25. SUCCESS
26. obtain devtools-save.pem (or use your own key if you're just hacking) - skipped

## Create DevTools Panel
1. http://code.google.com/chrome/extensions/manifest.html
2. http://code.google.com/chrome/extensions/devtools.panels.html
3. created manifest.json
4. included "devtools_page": "devtools.html"
5. created devtools.html
6. included script src="devtools.js"
7. created devtools.js
8. included chrome.devtools.panels.create( "Orion", "dark-orion-24x24.png", "panel.html", function(panel) {  });
9. console: Uncaught SyntaxError: Unexpected token function devtools.html:13
10. Removed function(panel) {  }
11. SUCCESS
12. Updated Milestone
Embed Orion
13. http://aniefer.blogspot.com/2011/02/embedding-orion-editor_02.html
14. http://orioneditor.blogspot.com/2012/01/using-orion-editor-with-almond.html
15. Working in panel.html
16. included script data-main="orionformatter" src="orionformatter.js" from Gist
17. included script src="require.js" from http://requirejs.org/docs/download.html#requirejs
18. included require({"orionformatter"});
19. changed data-main to orionformatter
20. updated define() statement with my file structure
21. Created embed-test directory to abstract embedding the orion editor
22. set baseURL to '../embed-test'
23. console: Failed to load resource i18n.js
24. included i18n.js in root
25. error fixed
26. Uncaught Error: NETWORK_ERR: XMLHttpRequest Exception 101 (util.js: line 22)
27. http://www.chromium.org/developers/how-tos/run-chromium-with-flags
28. Terminal Command Zach-Morenos-MacBook-Pro:~ xachmoreno$ /applications/google\ chrome\ canary.app/contents/macos/google\ chrome\ canary --remote-debugging-port=9222
29. Terminal Responce terminate called throwing an exceptionAbort trap: 6
30. ABANDONED
31. moved embed-test to http://www.zachariahmoreno.com/portfolio/embed-test because XMLHttpRequest errors are likely caused by called files locally instead of on a web server - source
32. double checked that I have the latest verision on i18n.js - CURRENT
33. double checked that I have the latest veriosn of orion.client - OLD
34. downloaded eclipse-orion-0.5M1-macosx.cocoa.x86_64.zip
35. pulled out downloads/eclipse/plugins/org.eclipse.orion.client.editor_0.1.0.v20120412-2022/web/orion
36. swapped with http://www.zachariahmoreno.com/portfolio/embed-test/orion (OLD VERSION)
37. updated orionformatter.js
38. updated define() method
39. Console Failed to Load resource orion/textview/nls/en-us/messages.js - file did not exist
40. duplicated messages.js > created en-us folder > moved messages.js into en-us folder
41. NO CONSOLE ERRORS
42. i18n.js stops on line 133 because require.mixin() method returns UNDEFINED
43. triple checked my version on i18n.js, replaced live copy with copy from /Users/xachmoreno/Downloads/eclipse/plugins/org.eclipse.orion.client.core_0.2.0.v20120413-2137/web/requirejs - same error
44. in orionformatter.js I added i18n to the define() method
45. NO ERRORS
46. hard coded CSS references into index.html
47. demo code snippet flashing for 1 second then disappearing
48. asked John Barton, he said to try setting height
49. set height on editor container
50. SUCCESS
51. Move embeded Orion into orion.panel/panel.html
52. Forked Eclipse/Orion.Server on GitHub
53. Began reading docs in orion.server/doc/org.eclipse.orion.doc.isv/WikiDoc/Orion
54. SET ASIDE & MOVED ON
55. Embed local Orion within panel.html
56. Downloaded latest copy of Orion for Mac & put it in the orion-0.4-mac folder
57. StackOverFlow - NPAPI PlugIn
58. Chrome NPAPI PlugIn Extension Docs
59. Mozilla PlugIns
60. Gecko NPAPI Docs
61. "NO NPAPI, assume Orion is running" - John Barton
62. Downloaded latest copy of Orion for Windows & put it in the orion-0.4-win folder
63. Launch .exe with JavaScript
64. FileSystemObject
65. Downloaded latest copy of Orion for Linux & put it in the orion-0.4-lnx folder
66. Used iframe to embed full orion local - src="http://localhost:8080"
67. SUCCESS
68. ABANDONED
69. Created & switched to 'embedded' branch & removed full copies of Orion
70. Copied structure & code from embed-test to root of orion-panel
71. Updated paths in panel.html & orionformatter.js to support new structure
72. SUCCESS
73. Updated Milestones

## Pull in client side code
1. http://code.google.com/chrome/extensions/debugger.html
2. https://developers.google.com/chrome-developer-tools/docs/remote-debugging#extension
3. http://code.google.com/chrome/extensions/samples.html#8f52a8a59c6fc16cb0d1ed0680b7f005be033d58
4. HTML5 Local Storage tutorial
5. chrome.contextMenus
6. Created js/getdocs.js
7. chrome.DOM.getDocument
8. Remote DOM Modifications - Pavel Feldman
9. fixed require baseURL issue
10. updated manifest to version 2 & removed background.html
11. manifest v2 breaks orion.client - changed back to v1 & filed issue #3
12. moved min chrome version to 19
13. created getDocs branch
14. chrome.devtools.getResources example
15. copied code from example into getdocs.js - removed .experimental.
16. Docs
17. Uncaught TypeError: Cannot read property 'inspectedWindow' of undefined
18. chrome.devtools.inspectedWindow.getResources is not in experimental (list of experimental APIs)
19. Asked for help on IRC #chromium-extensions
20. attempted copying code from getdocs.js & pasted it in panel.html, devtools.html, & devtools.js
21. SAME ERROR
22. Undocked DevTools, opened Orion panel, opened another DevTools window, console is logging resources of inspected window
23. SUCCESS
24. added resources.getContent() to getResource()
25. Uncaught TypeError: Object [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] has no method 'getContent' - getdocs.js:13
26. Updated Milestone dates
27. Both should work, once you 1) call the set...() handler and 2) change the selector in the config panel. All link clicks then land in your panel

## Enhancements
1. Google Play Tabs
2. Embed Adobe Brackets editor (code mirror)
3. Integrate collaborative real-time editing (Operation Transform)
4. Wikipedia - Operational Tranform
5. Understanding & Applying Operatonal Transform
6. StackOverflow - Operation Transform Library?
7. Google Diff-Match-Patch API
8. Leverage Chrome's OAuth sign in for saving sftp credentials
9. chop style code review messages
10. contributor diff like MS Word Track Changes
11. extend editor API to Web Components

## Resources
1. Contributing to Chrome Developer Tools - Pavel Feldman
