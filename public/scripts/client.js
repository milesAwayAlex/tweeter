/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const endpoint = '/tweets';

const createTweetElement = (tweet) => {
  const $tweet = $(
    `<article class="tweet"><header class="tweet-header"><div class="user"><img src="${
      tweet.user.avatars
    }" alt="user avatar"><span class="username">${
      tweet.user.name
    }</span></div><div><span class="handle">${
      tweet.user.handle
    }</span></div></header><p class="tweet-content">${
      tweet.content.text
    }</p><footer class="tweet-footer"><div><span class="date">${timeago.format(
      tweet.created_at,
    )}</span></div><div class="icon-row"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div></footer></article>`,
  );
  return $tweet;
};

const renderTweets = (tweets, container) => {
  const $tweets = tweets.map((t) => createTweetElement(t));
  container.append($tweets);
};

const loadTweets = () => $.ajax(endpoint);

const submitAsync = (e) => {
  e.preventDefault();
  const data = $(e.target).serialize();
  $.ajax(endpoint, { method: 'POST', data });
};

$(document).ready(() => {
  $('#tweet-form').on('submit', submitAsync);
  loadTweets().then((tweetArr) =>
    renderTweets(tweetArr, $('#tweets-container')));
});
