$(document).ready(function() {
  $("textarea").keyup(function(event){
    const count = 140 - this.value.length;
    $(this).siblings().children('.counter').text(count).toggleClass("invalid", count < 0);
  })
});