/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const endpoint = '/tweets';

const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const $tweet = $(
    `<article class="tweet"><header class="tweet-header"><div class="user"><img src="${
      tweet.user.avatars
    }" alt="user avatar"><span class="username">${
      tweet.user.name
    }</span></div><div><span class="handle">${
      tweet.user.handle
    }</span></div></header><p class="tweet-content">${escape(
      tweet.content.text,
    )}</p><footer class="tweet-footer"><div><span class="date">${timeago.format(
      tweet.created_at,
    )}</span></div><div class="icon-row"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div></footer></article>`,
  );
  return $tweet;
};

const renderTweets = (tweets, container) => {
  const $tweets = tweets
    .sort((a, b) => b.created_at - a.created_at)
    .map((t) => createTweetElement(t));
  container.html($tweets);
};

const loadTweets = () => $.ajax(endpoint);

const submitAsync = (e) => {
  e.preventDefault();
  const twLen = e.target[0].value.length;
  if (twLen === 0) {
    return alert('Your tweet appears to be empty. Please write something');
  }
  if (twLen > charLimit) {
    return alert(
      `Your tweet is ${twLen} characters long, while the limit is ${charLimit}.`,
    );
  }
  const data = $(e.target).serialize();
  $.ajax(endpoint, { method: 'POST', data })
    .then(() => loadTweets())
    .then((tweetArr) => renderTweets(tweetArr, $('#tweets-container')));
  $(e.target[0]).val('');
  $(e.target[2]).text(charLimit);
};

$(document).ready(() => {
  $('#tweet-form').on('submit', submitAsync);
  loadTweets().then((tweetArr) =>
    renderTweets(tweetArr, $('#tweets-container')));
});
