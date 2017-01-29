/* jquery.findyourrep.ca
 * =====================
 *
 * Extends and overrides the jQuery.findYourRep plugin built by Dan Drinkard to
 * render a find-your-reps form into a target HTML element using the Open North
 * Represent API.
 *
 * Copyright 2014 Open North Inc. BSD3 License.
 *
 * Usage:
 * ------
 *
 * Create an HTML element to use as a target, and call findYourRep(options) on it.
 * This example shows the default options.
 *
 * ```javascript
 * $('.mytarget').findYourRep({
 *   apis: 'represent',
 *   title: 'The Title of your Widget',
 *   text: 'Enter your address to see who represents you.',
 *   action: 'Go!'
 * });
 * ```
 */
;(function(window){

  $.findYourRep.represent = function(address) {
    var dfd = new $.Deferred(),
        url = "https://represent.opennorth.ca/representatives/?limit=0&callback=?",
        params = {};

    $.findYourRep.geocodeOrResolveImmediately(address).done(function(geocoded){
      params.point = geocoded.latitude + ',' + geocoded.longitude;
      $.findYourRep.apiCall(url, params).done(function(data){
        dfd.resolve(data['objects']);
      });
    });
    return dfd;
  };

  $.findYourRep.getTemplateContext = function(rep, api){
    return {
      details: rep.elected_office + ', ' + rep.district_name,
      photoUrl: rep.photo_url,
      resultUrl: rep.url || rep.source_url,
      name: rep.name,
      distric_name: rep.distric_name,
      elected_office: rep.elected_office,
      source_url: rep.source_url,
      party_name: rep.party_name,
      email: rep.email,
      url: rep.url,
      slug: rep.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
    };
  }

  $.findYourRep.formTemplate = "" +
    "<div class='find-your-rep fyr-container' id='fyr-id{{ idx }}' data-apis='{{ apis }}'>" +
      "<h3>{{ title }}</h3>" +
      "<div class='fyr-controls'>" +
        "<form>" +
          "<label for='fyr-address'>{{ text }}</label>" +
          "<div class='form-inline'>" +
            "<input type='text' class='fyr-address form-control' id='fyr-address' placeholder='Eg. A1A 1A1' value='{{ defaultValue }}'>" +
            "<button type='submit' class='btn btn-primary fyr-submit'>{{ action }}</button>" +
          "</div>" +
        "</form>" +
      "</div>" +
     "</div>" +
    "<p><small>Powered by <a href='https://represent.opennorth.ca/'>Represent</a></small></p>";

  $.findYourRep.resultsTemplate = "" +
    "<div class='fyr-results'>" +
      "<h3>Your Representatives</h3>" +
      "<p>Click on a representative to find more details on how to contact them.</p>" +
      "<div class='fyr-represent cf' style='display:none;'>" +
        "<ul class='fyr-reps'></ul>" +
      "</div>" +
      "<a href='#' class='fyr-back'>&laquo; start over</a>" +
    "</div>";

  $.findYourRep.resultTemplate = "" +
    "<li class='fyr-rep cf'>" +
      "<input type='checkbox' class='checkbox' id='{{ slug }}' name='{{ name }}' value='{{ slug }}'>" +
      "<label for='{{ slug }}'>" +
        "<img src='{{ photoUrl }}' alt='photo of {{ name }}'>" +
        "<h4>{{ name }}</h4>" +
        "<p class='fyr-details'>{{ details }}</p>" +
      "</label>" +

    "</li>";


})(this);
