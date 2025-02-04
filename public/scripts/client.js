/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const endpoint = '/tweets';
const animTime = 300;
const charLimit = 140;

// html escape for user input - to prevent XSS
const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// generate the layout from a tweet object
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

// generate and render the tweets
const renderTweets = (tweets, container) => {
  const $tweets = tweets
    .sort((a, b) => b.created_at - a.created_at)
    .map((t) => createTweetElement(t));
  container.html($tweets);
};

const loadTweets = () => $.ajax(endpoint);

// promisify the $.stideToggle for use in UI
const slide = ($el, dur) =>
  new Promise((resolve) => $el.slideToggle(dur, resolve));

// submit new tweet logic
const submitAsync = async (e) => {
  e.preventDefault();
  const $errMess = $('.error');
  const $errText = $('#error-text');
  let animation;
  // if the error message is shown - hide it
  if ($errMess.is(':visible')) {
    animation = slide($errMess, animTime);
  }
  // check the tweet length
  const twLen = e.target[0].value.length;
  // if length is 0 - show the error message
  if (twLen === 0) {
    await animation;
    $errText.text('Your tweet appears to be empty. Please write something');
    $errMess.slideToggle(animTime);
    return;
  }
  // if length is over the limit - show the error message
  if (twLen > charLimit) {
    await animation;
    $errText.text(
      `Your tweet is ${twLen} characters long, while the limit is ${charLimit}.`,
    );
    $errMess.slideToggle(animTime);
    return;
  }
  // if the length is correct - submit via AJAX
  const data = $(e.target).serialize();
  $.ajax(endpoint, { method: 'POST', data })
    // re-render the tweets
    .then(() => loadTweets())
    .then((tweetArr) => renderTweets(tweetArr, $('#tweets-container')));
  // reset the form
  $(e.target[0]).val('');
  $(e.target[2]).text(charLimit);
};

// show the new tweet form
const toggleNewTweet = () => {
  $('#new-tweet').slideToggle(animTime, () => {
    $('#tweet-text').focus();
  });
};

// attach the event handlers
$(document).ready(() => {
  $('#new-tweet').hide();
  $('.new-tweet-btn').on('click', toggleNewTweet);
  $('#tweet-form').on('submit', submitAsync);
  loadTweets().then((tweetArr) =>
    renderTweets(tweetArr, $('#tweets-container')));
});
