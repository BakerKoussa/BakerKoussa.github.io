(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Enhanced smooth scrolling for all navigation links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 800, 'easeInOutQuart');
      
      // Close mobile menu if open
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Enhanced navbar functionality
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Add active class to navigation links based on scroll position
  $(window).scroll(function() {
    var scrollPos = $(window).scrollTop();
    $('.nav-link').each(function() {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.length) {
        var refElementTop = refElement.offset().top - 100;
        var refElementBottom = refElementTop + refElement.height();
        
        if (scrollPos >= refElementTop && scrollPos < refElementBottom) {
          $('.nav-link').removeClass("active");
          currLink.addClass("active");
        }
      }
    });
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

  // Animate skill bars on scroll
  function animateSkillBars() {
    $('.skill-progress').each(function() {
      var $this = $(this);
      var width = $this.css('width');
      
      if ($this.isInViewport() && !$this.hasClass('animated')) {
        $this.addClass('animated');
        $this.css('width', '0%');
        $this.animate({
          width: width
        }, 1500, 'easeOutQuart');
      }
    });
  }

  // Check if element is in viewport
  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  // Trigger skill bar animation on scroll
  $(window).scroll(animateSkillBars);
  $(window).on('load', animateSkillBars);

  // Add fade-in animations to elements on scroll
  function animateOnScroll() {
    $('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').each(function() {
      var $this = $(this);
      if ($this.isInViewport() && !$this.hasClass('animated')) {
        $this.addClass('animated');
      }
    });
  }

  $(window).scroll(animateOnScroll);
  $(window).on('load', animateOnScroll);

  // Enhanced portfolio modal functionality
  $('.portfolio-card').on('click', function() {
    var targetModal = $(this).data('target');
    $(targetModal).modal('show');
  });

  // Close modal on escape key
  $(document).keyup(function(e) {
    if (e.key === "Escape") {
      $('.modal').modal('hide');
    }
  });

  // Mobile menu improvements
  $('.navbar-toggler').on('click', function() {
    $(this).toggleClass('active');
  });

  // Close mobile menu when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.navbar').length) {
      $('.navbar-collapse').collapse('hide');
      $('.navbar-toggler').removeClass('active');
    }
  });

  // Smooth reveal animations for sections
  function revealSections() {
    $('.section-padding').each(function() {
      var $this = $(this);
      if ($this.isInViewport() && !$this.hasClass('revealed')) {
        $this.addClass('revealed');
        $this.find('.section-title').addClass('fade-in-up');
        $this.find('.section-subtitle').addClass('fade-in-up');
      }
    });
  }

  $(window).scroll(revealSections);
  $(window).on('load', revealSections);

  // Enhanced touch interactions for mobile
  if ('ontouchstart' in window) {
    $('.portfolio-card, .skill-category, .contact-item').on('touchstart', function() {
      $(this).addClass('touch-active');
    }).on('touchend', function() {
      $(this).removeClass('touch-active');
    });
  }

  // Lazy loading for images
  function lazyLoadImages() {
    $('img[data-src]').each(function() {
      var $this = $(this);
      if ($this.isInViewport()) {
        $this.attr('src', $this.data('src'));
        $this.removeAttr('data-src');
      }
    });
  }

  $(window).scroll(lazyLoadImages);
  $(window).on('load', lazyLoadImages);

  // Performance optimization: Throttle scroll events
  function throttle(func, limit) {
    var inThrottle;
    return function() {
      var args = arguments;
      var context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // Apply throttling to scroll events
  $(window).scroll(throttle(function() {
    navbarCollapse();
    animateSkillBars();
    animateOnScroll();
    revealSections();
    lazyLoadImages();
  }, 16)); // ~60fps

  // Initialize tooltips if Bootstrap is available
  if (typeof $.fn.tooltip !== 'undefined') {
    $('[data-toggle="tooltip"]').tooltip();
  }

  // Initialize popovers if Bootstrap is available
  if (typeof $.fn.popover !== 'undefined') {
    $('[data-toggle="popover"]').popover();
  }

  // Add loading states to buttons
  $('.btn').on('click', function() {
    var $this = $(this);
    if (!$this.hasClass('loading')) {
      $this.addClass('loading');
      setTimeout(function() {
        $this.removeClass('loading');
      }, 2000);
    }
  });

  // Enhanced WhatsApp chat functionality
  $('.whatsapp-chat').on('click', function() {
    // Add click tracking or analytics here
    console.log('WhatsApp chat clicked');
  });

  // Preload critical images
  function preloadImages() {
    var imageUrls = [
      'assets/img/profile.webp',
      'assets/img/portfolio/adayas.webp',
      'assets/img/portfolio/libas.webp'
    ];
    
    imageUrls.forEach(function(url) {
      var img = new Image();
      img.src = url;
    });
  }

  // Call preload after page load
  $(window).on('load', preloadImages);

  // Add CSS classes for better mobile experience
  if (window.innerWidth <= 768) {
    $('body').addClass('mobile-device');
  }

  // Handle orientation change
  $(window).on('orientationchange', function() {
    setTimeout(function() {
      // Recalculate positions after orientation change
      navbarCollapse();
      animateSkillBars();
    }, 500);
  });

  // Add loading animation to page
  $(window).on('load', function() {
    $('body').addClass('loaded');
  });

})(jQuery); // End of use strict
