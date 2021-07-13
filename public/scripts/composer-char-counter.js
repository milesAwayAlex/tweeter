$(document).ready(() => {
  $('#tweet-text').on('input', (e) => {
    console.log(e.target.value);
  });
});
