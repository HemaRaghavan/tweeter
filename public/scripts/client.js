/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const createTweetElement = postObj => {
    let output = ""
    output += `<article class="tweet">`;
    output += "<header>";
    output += `<img class="tweets-img" src=${postObj.user.avatars}> `;
    output += `<span class="tweeter-name">${postObj.user.name}</span> `;
    output += `<a class="tweeter-handle">${postObj.user.handle}</a> `;
    output += `</header>`;
    output += `<p class="tweet-content">`;
    output += `${postObj.content.text}</p>`;
    output +=  `<footer class="footer"> ${postObj.created_at} <a class="icon">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
                </a>
                </footer>`
  
    output += `</article>`
  
    return output
  };
  const renderTweets = tweetsArray => {
    for (const key in tweetsArray) {
      const $tweet = createTweetElement(tweetsArray[key]);
      $('#tweets-container').append($tweet);
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

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    }).then(function(data) {
        console.log("success");
    })
    
    
  });

});


