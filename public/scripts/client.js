/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Function to prevent Cross-Site Scripting:
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  const createTweetElement = postObj => {
    let output = ""
    output += `<article class="tweet">`;
    output += "<header>";
    output += `<img class="tweets-img" src=${escape(postObj.user.avatars)}> `;
    output += `<span class="tweeter-name">${escape(postObj.user.name)}</span> `;
    output += `<a class="tweeter-handle">${escape(postObj.user.handle)}</a> `;
    output += `</header>`;
    output += `<p class="tweet-content">`;
    output += `${escape(postObj.content.text)}</p>`;
    output +=  `<footer class="footer"> 10 days ago <a class="icon">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
                </a>
                </footer>`
  
    output += `</article>`
  
    return output
  };
  const renderTweets = tweetsArray => {
    $("#tweets-container").empty();
    for (const key in tweetsArray) {
      const $tweet = createTweetElement(tweetsArray[key]);
      $('#tweets-container').prepend($tweet);
    }
  }
  
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET' 
    })
    .then(function (data) {
        renderTweets(data);
    })
    
  }
  loadTweets();

  $("#form_submit").submit(function(event) {
     // prevent the default behaviour to leave the page
    event.preventDefault(); 
    $('.tweet-error').hide()
    const inputLength = $(this).children('textarea').val().length;
    if(inputLength >140) {                                     
      $(this).each(function() {
        $('.tweet-error').text("Sorry, content exceeds the 140 character limit").slideDown("slow");
      });
    } else if (inputLength === 0) {                            
        $(this).each(function() {
          $('.tweet-error').text("Tweet is empty").slideDown("slow");
        });
    } else {
      $('.tweet-error').hide();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      }).then(function(data) {
         loadTweets();
      })
      $(this).children('textarea').val('');
      $(this).find(".counter").text('140');

    }
    
    
  });

});


