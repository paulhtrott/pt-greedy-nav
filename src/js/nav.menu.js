$(function() {
  var $nav = $('nav');
  var $button = $('nav button');
  var $visibleLinks = $('nav .visible-links');
  var $hiddenLinks = $('ul.hidden-links');

  // Array to hold links width
  var breaks =[];

  function updateNav() {
    // Get the available space for the menu items
    var availableSpace = $button.hasClass('hidden') ? $nav.width() : $nav.width() - $button.width() - 25;
    
    // Visible list is overflowing the navigation width
    if ($visibleLinks.width() > availableSpace) {
      // Record the width of the list
      breaks.push($visibleLinks.width());
    
      // Move item to the hidden list dropdown menu
      $visibleLinks.children().last().prependTo($hiddenLinks);

      // Show the hamburger button
      if ($button.hasClass('hidden')) {
        $button.removeClass('hidden');
      }

      updateNav();

    } else if ($(window).width() <= 640 && $visibleLinks.children().length > 0) {
      //Add all links to hidden menu at 640px
      while ($visibleLinks.children().length > 0) {
        breaks.push($visibleLinks.width());
        $visibleLinks.children().last().prependTo($hiddenLinks);
      }
  
      updateNav();
    } else {
      // There is space for another item in the navigation
      if (availableSpace > breaks[breaks.length -1] && $(window).width() > 640) {
        // Move the menu item to the visible list
        $hiddenLinks.children().first().appendTo($visibleLinks);
        breaks.pop();
        updateNav();
      }

      // Hide Dropdown Button is hidden list is empty
      if (breaks.length < 1) {
        $button.addClass('hidden');
        $hiddenLinks.addClass('hidden');
      }
    }
 
    // Update the counter
    $button.attr("count", breaks.length);

    // Reload if the visible list is still overflowing the navigation
    if ($visibleLinks.width() > availableSpace) {
      updateNav();
    }
  }

  // Button Clicked
  $button.on('click', function() {
    $hiddenLinks.toggleClass('hidden');
  });

  // Update Nav on Load
  updateNav();

  // Update Nav on resize
  $(window).resize(function() {
    updateNav();
  });
});
