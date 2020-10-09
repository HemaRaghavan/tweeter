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
    for (const key in tweetsArray) {
      const $tweet = createTweetElement(tweetsArray[key]);
      $('#tweets-container').append($tweet);
    }
  }
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  renderTweets(data);

});


