//@prepros-prepend jquery.min.js
//@prepros-prepend jquery.findyourrep-pack.min.js
//@prepros-prepend jquery.findyourrep-ca.js
(function(window){
  /*
   * Initialize FindYourRep
   * https://github.com/opennorth/jquery-findyourrep-ca
   */
  $('body').find('#fyr').findYourRep({
    apis: 'represent',
    text: 'Enter your postal code to see who represents you.',
  });

  $(document).on('click', '#fyrSelectReps', function(e) {
    var selectedReps = [];
    $(".fyr-reps input:checked").each(function() {
      var selectedRep = [
        $(this).parent().data('name'),
        $(this).parent().data('email')
      ];
      selectedReps.push( selectedRep );
    });
    if ( selectedReps.length ) {
      console.log(selectedReps);
      $('#fyrSelectReps').text('Select these ' + selectedReps.length + ' representatives');
    } else {
      $('#selectOneAlert').hide();
      $('#fyrSelectReps').text('Select these representatives');
      $('#fyrRepsSelectedForm').append('<p class="alert alert-warning" id="selectOneAlert">Oops! Please select at least one representative and then try again.</p>');
    }

    var count = $('.fyr-reps input:checked').length;

  });


  /*var selected = [];
  $('.fyr-reps .checkbox:checked').each(function() {
    selected.push( $(this).parent().data('email') );
  });
  if ( selected.length ) {
    console.log(selected);
    e.preventDefault();
  } else {
    $('#fyrRepsSelectedForm').prepend('<p class="alert alert-warning">Oops! Please select at least one representative and then try again.</p>');
    e.preventDefault();
  }*/

})(this);
