//count characters in the tweets input form:
$(document).ready(function() {
  $("textarea").keyup(function(event){
    //count the number of characters that can be entered
    const count = 140 - this.value.length;
    // update the count in HTML, add an "invalid" class to textarea if limit is reached
    $(this).siblings().children('.counter').text(count).toggleClass("invalid", count < 0);
  })
});