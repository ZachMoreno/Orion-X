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
 *     jQuery
 *     Twitter Bootstrap
================================================================================ */

// Popover works but because of where the Orion logo is, it is getting cut off - offset works kinds

// $(document).ready(function() {
//     $("a[rel=popover]")
//         .popover({
//             placement: 'bottom',
//			animation: true,
//			trigger: 'hover',
//			title: 'Orion-X DevTools Extension',
//			content: 'Content',
//			offset: -80
//         })
//         .click(function(e) {
//             e.preventDefault();
//         });
// });


$(window).load(function() {
	$('.dropdown-toggle').dropdown();
});


$(window).load(function() {
	$("a.fancybox").fancybox({
		'hideOnContentClick': true,
		'showCloseButton'   : true,
		'transitionIn'      : 'elastic',
		'transitionOut'     : 'elastic',
		'speedIn'           : 600,
		'speedOut'          : 200,
		'overlayColor'      : '#fff'
	});
	
	$("a.iframe").fancybox({
		'hideOnContentClick': true,
		'showCloseButton'   : true,
		'transitionIn'      : 'elastic',
		'transitionOut'     : 'elastic',
		'speedIn'           : 600,
		'speedOut'          : 200,
		'overlayColor'      : '#fff'
	});
});

