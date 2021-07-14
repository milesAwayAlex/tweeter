/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense, donc je suis',
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = (tweet) => {
  const $tweet = $(
    `<article class="tweet"><header class="tweet-header"><div class="user"><img src="${tweet.user.avatars}" alt="user avatar"><span class="username">${tweet.user.name}</span></div><div><span class="handle">${tweet.user.handle}</span></div></header><p class="tweet-content">${tweet.content.text}</p><footer class="tweet-footer"><div><span class="date">${tweet.created_at}</span></div><div class="icon-row"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div></footer></article>`,
  );
  return $tweet;
};

const renderTweets = (tweets, container) => {
  const $tweets = tweets.map((t) => createTweetElement(t));
  container.append($tweets);
};

$(document).ready(() => {
  renderTweets(data, $('#tweets-container'));
});
