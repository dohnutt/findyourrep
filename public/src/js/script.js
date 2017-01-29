//@prepros-prepend jquery.min.js
//@prepros-prepend jquery.findyourrep-pack.min.js
//@prepros-prepend jquery.findyourrep-ca.js

(function($) {

  /*
   * Initialize FindYourRep
   * https://github.com/opennorth/jquery-findyourrep-ca
   */
  $('body').find('#fyr').findYourRep({
    apis: 'represent',
    text: 'Enter your postal code to see who represents you.'
  });

  /*
   * Accessible skip to content link
   */
  $(".skip").click(function(event){
    // strip the leading hash and declare the content we're skipping to
    event.preventDefault();
    var skipTo="#"+this.href.split('#')[1];
    // Setting 'tabindex' to -1 takes an element out of normal tab flow but allows it to be focused via javascript
    $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
      // when focus leaves this element, remove the tabindex attribute
      $(this).removeAttr('tabindex');
    }).focus(); // focus on the content container
  });

  /*
   * Share links open in a small popup window
   */
  $('.share-link').click(function(e) {
    e.preventDefault();
    window.open($(this).attr('href'), 'shareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    return false;
  });
})(jQuery);
