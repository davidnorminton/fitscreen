/**
 *  About   : A jQuery plugin which automatically resizs elements to fit the width and height of browser viewport
 *  Author  : David Norminton
 *  Website : http://davenorm.me
 *  Version : 0.4
 */
 
(function($){

   // store the screen height
   var screen_height = $(window).height(),
   // store document width
       screen_width  = $(document).width;
    
   /**
    * Plugin  Constructor
    * @param  object  element - the html element being processed
    */
   function method( element ) {
       // first add the css to the html elements to ensure correct dimensions       
       setDimensions( element );
    
       $(window).scroll( function(){

           var elementOffSet = element.offset().top,
               elementHeight = element.height(),
               scroll = $(window).scrollTop(),
               elementOnTop = elementOffSet + ( elementHeight );
       
           // check if element is in range
           if ( elementOffSet < scroll + 1  &&  elementOnTop > scroll + 1  ) {
               
               // detect if the user has stopped scrolling
               clearTimeout($.data(this, 'scrollTimer'));

               $.data(this, 'scrollTimer', setTimeout(function() {
                            //  console.log( 'moving up ', elementOffSet, '  ', elementOnTop , '  ', scroll );
                          // move element to top of screen 
                          // calculate which way to slide
                          // based on how much of the screen the element covers
                          var elTop = elementOffSet + ( elementHeight / 2 ); 
                          if ( scroll > elTop ) {
                              // the element is less than 50% on screen so scroll to  
                              // a position that is the offset().top of the element plus it's height
                              $('html, body').animate({ scrollTop: elementOffSet + elementHeight });
                          } else {
                              // over 50% of element is on screen so scroll to a position equal to 
                              // the elemets offset().top
                              $('html, body').animate({ scrollTop: elementOffSet });
                          }
                      // duration of effect
                      }, 500)); 
              }

       });
   }


   /**
    *  Add css to the elements specified by the class that was passed into the plugin 
    *  @param  object  element
    */
   function setDimensions( element ) {
      // set a min-height and min-width to the element
      return element.css({'min-height': screen_height, 'min-width': screen_width});

   }
  

   $.fn.fitScreen = function() {

       // loop over each element and set dimensions
       this.each(function(){  method($(this)); });

   };

// pass in jQuery objects to be used in plugin
}( jQuery));
