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

  // Function to calculate how long ago the tweet was created:
  function convertTime(timeCreated) {
    let created = new Date(timeCreated);
    let timeInSeconds = Math.floor((Date.now() - created) / 1000);
    let difference = Math.floor(timeInSeconds / 31536000);
    if (difference > 1) {
      return difference + ' years ago';
    }
    difference = Math.floor(timeInSeconds / 2592000);
    if (difference > 1) {
      return difference + ' months ago';
    }
    difference = Math.floor(timeInSeconds / 86400);
    if (difference > 1) {
      return difference + ' days ago';
    }
    difference = Math.floor(timeInSeconds / 3600);
    if (difference > 1) {
      return difference + ' hours ago';
    }
    difference = Math.floor(timeInSeconds / 60);
    if (difference > 1) {
      return difference + ' minutes ago';
    }
    return Math.floor(timeInSeconds) + ' seconds ago';
  }
  
  // Function: takes in a tweet object and return it in HTML
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
    output +=  `<footer class="footer"> ${escape(convertTime(postObj.created_at))} <a class="icon">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
                </a>
                </footer>`
  
    output += `</article>`
  
    return output
  };

  // Function: takes an array of tweet objects and append each to the #tweets-container in HTML
  const renderTweets = tweetsArray => {
    $("#tweets-container").empty();
    for (const element of tweetsArray) {
      const $tweet = createTweetElement(element);
      $('#tweets-container').prepend($tweet);
    }
  }

  // Function to fetch tweets from /tweets
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

  //submit tweets
  $("#form_submit").submit(function(event) {
     // prevent the default behaviour to leave the page
    event.preventDefault(); 
    $('.tweet-error').hide()
    const inputLength = $(this).children('textarea').val().length;
    // Validates that tweet length is <= 140 characters before submitting it
    if(inputLength >140) {                                     
      $(this).each(function() {
        $('.tweet-error').text("Sorry, content exceeds the 140 character limit").slideDown("slow");
      });
    } else if (inputLength === 0) {  //verify that the input is not empty                          
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


