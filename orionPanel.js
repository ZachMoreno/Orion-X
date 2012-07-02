// watch when resource contents are committed
chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
	console.log('resource content committed', resource, content);
});

// create the Orion panel
chrome.devtools.panels.create('Orion', 'img/orion24.png', 'index.html', function(panel) {
	console.log('panel',JSON.stringify(panel),panel);

	chrome.devtools.panels.setOpenResourceHandler(function (selectResource) {
		if (!selectResource) {
			console.log('no selected resource');
		} else {
			console.log('Selected resource: ' + selectedResource);

			// access resource
			chrome.devtools.inspectedWindow.getResources(function (resource) {
				if (!resource) {
					console.log('no resource');
				} else {
					console.log('Resource: ' + resource);

					//access content
					devtools.inspectedWindow.Resource.getContent(function (content) {
						if (!content) {
							console.console.log('no content');
						} else {
							console.log('Content: ' + content);
							return content;
						}
					});
					return resource;
				}
			});
			return selectedResource;
		}
	});
});