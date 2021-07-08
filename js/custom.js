function create_custom_dropdowns() {
    $('select').each(function(i, select) {
      if (!$(this).next().hasClass('dropdown')) {
        $(this).after('<div class="dropdown ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
        var dropdown = $(this).next();
        var options = $(select).find('option');
        var selected = $(this).find('option:selected');
        dropdown.find('.current').html(selected.data('display-text') || selected.text());
        options.each(function(j, o) {
          var display = $(o).data('display-text') || '';
          dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
        });
      }
    });
  }
  
  // Event listeners
  
  // Open/close
  $(document).on('click', '.dropdown', function(event) {
    $('.dropdown').not($(this)).removeClass('open');
    $(this).toggleClass('open');
    if ($(this).hasClass('open')) {
      $(this).find('.option').attr('tabindex', 0);
      $(this).find('.selected').focus();
    } else {
      $(this).find('.option').removeAttr('tabindex');
      $(this).focus();
    }
  });
  // Close when clicking outside
  $(document).on('click', function(event) {
    if ($(event.target).closest('.dropdown').length === 0) {
      $('.dropdown').removeClass('open');
      $('.dropdown .option').removeAttr('tabindex');
    }
    event.stopPropagation();
  });
  // Option click
  $(document).on('click', '.dropdown .option', function(event) {
    $(this).closest('.list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    var text = $(this).data('display-text') || $(this).text();
    $(this).closest('.dropdown').find('.current').text(text);
    $(this).closest('.dropdown').prev('select').val($(this).data('value')).trigger('change');
  });
  
  // Keyboard events
  $(document).on('keydown', '.dropdown', function(event) {
    var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
    // Space or Enter
    if (event.keyCode == 32 || event.keyCode == 13) {
      if ($(this).hasClass('open')) {
        focused_option.trigger('click');
      } else {
        $(this).trigger('click');
      }
      return false;
      // Down
    } else if (event.keyCode == 40) {
      if (!$(this).hasClass('open')) {
        $(this).trigger('click');
      } else {
        focused_option.next().focus();
      }
      return false;
      // Up
    } else if (event.keyCode == 38) {
      if (!$(this).hasClass('open')) {
        $(this).trigger('click');
      } else {
        var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
        focused_option.prev().focus();
      }
      return false;
    // Esc
    } else if (event.keyCode == 27) {
      if ($(this).hasClass('open')) {
        $(this).trigger('click');
      }
      return false;
    }
  });
  
  $(document).ready(function() {
    create_custom_dropdowns();
  });

  /* tabs mobile */

  var $container = $(".js-tabs").parent();
var $tabsToggleGroup = $(".tabs__toggle-group");
var $tabs = $(".tabs__toggle");
var $activeTab = $(".tabs__toggle--active");
var $tabContents = $(".tabs__tab");

var $scrollLeft		= $(".js-action--scroll-left");
var $scrollRight	= $(".js-action--scroll-right");

var btnScrollLeft	= document.querySelector('.js-action--scroll-left');
var btnScrollRight	= document.querySelector('.js-action--scroll-right');
var tabsContainer	= document.querySelector('.tabs__toggle-group');
var tabs			= document.querySelectorAll('.tabs__toggle');
var selectedTabIndex	= 0;
var scrollIndex		= 0;
var scrollWidth		= tabs[0].clientWidth + 5;
var scrollLeft		= 0;

// var tabsContainer = document.querySelector('.tabs__toggle-group');
var tabsContainerWidth = tabsContainer.clientWidth;
var tabsScrollableWidth = tabsContainer.scrollWidth;

console.log("Container Width:", tabsContainerWidth, "Tabs Width:", tabsScrollableWidth);

if (tabsScrollableWidth > tabsContainerWidth) {
	// $tabsToggleGroup.prepend('<div class="tabs__left"></div>').append('<div class="tabs__right"></div>');
	// $tabsToggleGroup.before('<div class="tabs__left"></div>').after('<div class="tabs__right"></div>');
}

$tabContents
	.hide()
	.eq($tabs.index($activeTab))
	.show();

$tabs.on("click", function() {
	
	var $tabs = $(".tabs__toggle");
	var $activeTab = $(".tabs__toggle--active");
	var $tabContents = $(".tabs__tab");
	var $tab = $(this);
	var tabIndex = $tabs.index($tab);
	
	selectedTabIndex = tabIndex;
	console.log("Selected Tab:", selectedTabIndex);
	
	$tab.addClass("tabs__toggle--active");
	$activeTab.removeClass("tabs__toggle--active");
	
	$tabContents
		.hide()
		.eq(tabIndex)
		.show();
	
	// debugger;
	var tab			= $tab[0];
	var tabWidth	= tab.clientWidth;
	var tabLeft		= tab.offsetLeft;
	// var tabLeft		= tabsContainer.scrollLeft;
	var tabRight	= tabLeft + tabWidth;
	// var 
	
	if (tabLeft < tabsContainer.scrollLeft) {
		// animatedScrollTo(
		// 	tabsContainer,
		// 	tabLeft,
		// 	300,
		// 	true,
		// 	function() {
		// 		checkScrollButtonState();
		// 	}
		// );
		// tabsContainer.smoothScroll({to: tabLeft, callback: checkScrollButtonState});
		smoothScroll(tabsContainer, {to: tabLeft, callback: checkScrollButtonState});
	}

	
	// if (tabRight > (tabsContainerWidth - tabsContainer.scrollLeft)) {
	if (tabRight > (tabsContainer.scrollLeft + tabsContainerWidth)) {
		// animatedScrollTo(
		// 	tabsContainer,
		// 	(tabRight - tabsContainerWidth),
		// 	// tabLeft,
		// 	300,
		// 	true,
		// 	function() {
		// 		checkScrollButtonState();
		// 	}
		// );
		// tabsContainer.smoothScroll({to: (tabRight - tabsContainerWidth), callback: checkScrollButtonState});
		smoothScroll(tabsContainer, {to: (tabRight - tabsContainerWidth), callback: checkScrollButtonState});
	}
});

// $scrollRight.on("click", function() {
// 	var currentScrollLeft = $tabsToggleGroup[0].scrollLeft;
// 	$tabsToggleGroup.animate({left: currentScrollLeft - 100}, 250, "easeOutBounce");
// });

// document.addEventListener('DOMContentLoaded', function() {
	
	// var btnScrollLeft	= document.querySelector('.js-action--scroll-left');
	// var btnScrollRight	= document.querySelector('.js-action--scroll-right');
	// // var tabsContainer	= document.querySelector('.tabs__toggle-group');
	// var tabs			= document.querySelectorAll('.tabs__toggle');
	// var scrollIndex		= 0;
	// var scrollWidth		= tabs[0].clientWidth + 5;
	// var scrollLeft		= 0;
	
	if (tabsContainer.scrollLeft === 0) {
		btnScrollLeft.setAttribute("disabled", true);
	}
	
	// btnScrollLeft.onclick = function() {
	// 	tabsContainer.scrollLeft -= scrollWidth;
	// };
	
	
// button.addEventListener('click', function () {
//     animatedScrollTo(
//         document.body, // element to scroll with (most of times you want to scroll with whole <body>)
//         0, // target scrollY (0 means top of the page)
//         10000, // duration in ms,
// 		true,
//         function() { // callback function that runs after the animation (optional)
//           console.log('done!')
//         }
//     );
// });
	
	btnScrollLeft.addEventListener('click', function() {
		// scrollLeft -= scrollWidth;
		// scrollIndex = selectedTabIndex - 1;
		scrollIndex--;
		// console.log("Tab Index to scroll LEFT to", scrollIndex);
		scrollLeft -= tabs[scrollIndex].clientWidth + 7;
		// animatedScrollTo(
		// 	tabsContainer,
		// 	scrollLeft,
		// 	300,
		// 	true,
		// 	function() {
		// 		checkScrollButtonState();
		// 	}
		// );
		// tabsContainer.smoothScroll({to: scrollLeft, callback: checkScrollButtonState});
		smoothScroll(tabsContainer, {to: scrollLeft, callback: checkScrollButtonState});
	});
	
	btnScrollRight.addEventListener('click', function() {
		// scrollLeft += scrollWidth;
		// scrollIndex = selectedTabIndex + 1;
		// console.log("Tab Index to scroll RIGHT to", scrollIndex);
		scrollLeft += tabs[scrollIndex].clientWidth + 7;
		scrollIndex++;
		// animatedScrollTo(
		// 	tabsContainer,
		// 	scrollLeft,
		// 	300,
		// 	true,
		// 	function() {
		// 		checkScrollButtonState();
		// 	}
		// );
		
		// tabsContainer.smoothScroll({to: scrollLeft, callback: checkScrollButtonState});
		smoothScroll(tabsContainer, {to: scrollLeft, callback: checkScrollButtonState});
		
	});
	
	function checkScrollButtonState() {
		// console.log("scrollLeft:", tabsContainer.scrollLeft, "clientWidth:", tabsContainer.clientWidth, "scrollWidth:", tabsContainer.scrollWidth);
		
		if (tabsContainer.scrollLeft <= 0) {
			btnScrollLeft.setAttribute("disabled", true);
		} else {
			btnScrollLeft.removeAttribute("disabled");
		}
		
		if (tabsContainer.scrollLeft + tabsContainer.clientWidth >= tabsContainer.scrollWidth) {
			btnScrollRight.setAttribute("disabled", true);
		} else {
			btnScrollRight.removeAttribute("disabled");
		}
	}
	
	// btnScrollRight.onclick = function() {
	// 	tabsContainer.scrollLeft += scrollWidth;
	// 	// var currentScrollLeft = tabs.scrollLeft;
	// 	// tabs.animate([
	// 	// 	// keyframes
	// 	// 	{ transform: 'translateX(0px)' },
	// 	// 	{ transform: 'translateX(-50px)' }
	// 	// ], { 
	// 	// 	// timing options
	// 	// 	duration: 300,
	// 	// 	iterations: 1
	// 	// });
	// 	// scroll(tabs);
	// };
	
	
// var start = null;

// function scroll(element, timestamp) {
// 	// debugger;
//   if (!start) start = timestamp;
//   var progress = timestamp - start;
//   tabs.scrollLeft = Math.min(progress / 10, 200);
//   if (progress < 2000) {
//     window.requestAnimationFrame(scroll);
//   }
// }

// window.requestAnimationFrame(scroll);
	
// }, false);



// @see https://github.com/madebysource/animated-scrollto/blob/master/animatedScrollTo.js
// (function(window) {
//     var requestAnimFrame = (function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();

//     var easeInOutQuad = function (t, b, c, d) {
//         t /= d/2;
//         if (t < 1) return c/2*t*t + b;
//         t--;
//         return -c/2 * (t*(t-2) - 1) + b;
//     };

//     var animatedScrollTo = function(element, to, duration, scrollLeft, callback) {
        
//         var direction = 'scrollTop'
//         if (scrollLeft) direction = 'scrollLeft'
        
//         var start = element[direction],
//         change = to - start,
//         animationStart = +new Date();
//         var animating = true;
//         var lastpos = null;

//         var animateScroll = function() {
//             if (!animating) {
//                 if (callback) { callback(); }
//                 return;
//             }
//             requestAnimFrame(animateScroll);
//             var now = +new Date();
//             var val = Math.floor(easeInOutQuad(now - animationStart, start, change, duration));
//             if (lastpos) {
//                 if (lastpos === element[direction]) {
//                     lastpos = val;
//                     element[direction] = val;
//                 } else {
//                     animating = false;
//                 }
//             } else {
//                 lastpos = val;
//                 element[direction] = val;
//             }
//             if (now > animationStart + duration) {
//                 element[direction] = to;
//                 animating = false;
//             }
//         };
//         requestAnimFrame(animateScroll);
//     };

//     if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//         module.exports = animatedScrollTo;
//     } else {
//         window.animatedScrollTo = animatedScrollTo;
//     }
// })(window);

// Element.prototype.smoothScroll = function(options) {
	
// 	var requestAnimFrame = (function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();

//     // var easeInOutQuad = function(t, b, c, d) {
//     //     t /= d/2;
//     //     if (t < 1) return c/2*t*t + b;
//     //     t--;
//     //     return -c/2 * (t*(t-2) - 1) + b;
//     // };
	
// 	var defaults = {
// 		to			: 0,
// 		duration	: 250,
// 		axis		: "horizontal",
// 		easing		: "easeInOutQuad"
// 	};
	
// 	var settings = Object.assign({}, defaults, options);
	
// 	var direction = settings.axis === "horizontal" ? "scrollLeft" : "scrollTop";

// 	var element = this;
// 	var start = element[direction],
// 		change = settings.to - start,
// 		animationStart = +new Date();
// 	var animating = true;
// 	var lastpos = null;

// 	var animateScroll = function() {
// 		if (!animating) {
// 			if (settings.callback) {
// 				settings.callback();
// 			}
// 			return;
// 		}
// 		requestAnimFrame(animateScroll);
// 		var now = +new Date();
// 		// var val = Math.floor(easeInOutQuad(now - animationStart, start, change, settings.duration));
// 		// var val = Math.floor(Easing.linear(now - animationStart, start, change, settings.duration));
// 		var val = Math.floor(Easing[settings.easing](now - animationStart, start, change, settings.duration));
// 		if (lastpos) {
// 			if (lastpos === element[direction]) {
// 				lastpos = val;
// 				element[direction] = val;
// 			} else {
// 				animating = false;
// 			}
// 		} else {
// 			lastpos = val;
// 			element[direction] = val;
// 		}
// 		if (now > animationStart + settings.duration) {
// 			element[direction] = settings.to;
// 			animating = false;
// 		}
// 	};
// 	requestAnimFrame(animateScroll);

// };

function smoothScroll(element, options) {
	
	var requestAnimFrame = (function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();

	var defaults = {
		to			: 0,
		duration	: 250,
		axis		: "horizontal",
		easing		: "easeInOutQuad"
	};
	
	var settings = Object.assign({}, defaults, options);
	
	var direction = settings.axis === "horizontal" ? "scrollLeft" : "scrollTop";

	var start = element[direction],
		change = settings.to - start,
		animationStart = +new Date();
	var animating = true;
	var lastpos = null;

	var animateScroll = function() {
		if (!animating) {
			if (settings.callback) {
				settings.callback();
			}
			return;
		}
		requestAnimFrame(animateScroll);
		var now = +new Date();
		var val = Math.floor(Easing[settings.easing](now - animationStart, start, change, settings.duration));
		if (lastpos) {
			if (lastpos === element[direction]) {
				lastpos = val;
				element[direction] = val;
			} else {
				animating = false;
			}
		} else {
			lastpos = val;
			element[direction] = val;
		}
		if (now > animationStart + settings.duration) {
			element[direction] = settings.to;
			animating = false;
		}
	};
	requestAnimFrame(animateScroll);

};

/**
 * Easing Functions - inspired from http://gizma.com/easing/
 */
Easing = {
	
	// no easing, no acceleration
	linear: function(t, b, c, d) {
		return c*t/d + b;
	},
	
	// accelerating from zero velocity
	easeInQuad: function(t, b, c, d) {
		t /= d;
		return c*t*t + b;
	},

	// decelerating to zero velocity
	easeOutQuad: function(t, b, c, d) {
		t /= d;
		return -c * t*(t-2) + b;
	},

	// acceleration until halfway, then deceleration
	easeInOutQuad: function(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	},
	
	// accelerating from zero velocity 
	easeInCubic: function(t, b, c, d) {
		t /= d;
		return c*t*t*t + b;
	},

	// decelerating to zero velocity 
	easeOutCubic: function(t, b, c, d) {
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	},

	// acceleration until halfway, then deceleration 
	easeInOutCubic: function(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t*t + b;
		t -= 2;
		return c/2*(t*t*t + 2) + b;
	},

	// accelerating from zero velocity 
	easeInQuart: function(t, b, c, d) {
		t /= d;
		return c*t*t*t*t + b;
	},

	// decelerating to zero velocity 
	easeOutQuart: function(t, b, c, d) {
		t /= d;
		t--;
		return -c * (t*t*t*t - 1) + b;
	},

	// acceleration until halfway, then deceleration
	easeInOutQuart: function(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t*t*t + b;
		t -= 2;
		return -c/2 * (t*t*t*t - 2) + b;
	},

	// accelerating from zero velocity
	easeInQuint: function(t, b, c, d) {
		t /= d;
		return c*t*t*t*t*t + b;
	},

	// decelerating to zero velocity
	easeOutQuint: function(t, b, c, d) {
		t /= d;
		t--;
		return c*(t*t*t*t*t + 1) + b;
	},

	// acceleration until halfway, then deceleration 
	easeInOutQuint: function(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t*t*t*t + b;
		t -= 2;
		return c/2*(t*t*t*t*t + 2) + b;
	}
	
};