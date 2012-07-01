// watch when resource contents are committed
chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
  console.log('resource content committed', resource, content);
});

// create the Orion panel
chrome.devtools.panels.create('Orion', 'img/orion24.png', 'index.html', function(panel) {
	console.log('panel',JSON.stringify(panel),panel);

	chrome.devtools.panels.setOpenResourceHandler(function (selectResource) {
		// access to resources & content
		chrome.devtools.inspectedWindow.getResources(function (resource) {
			if (!resource) {
				console.log('no resource');
			} else {
				console.log(resource);
				return resource;
			}
		});
	});
});