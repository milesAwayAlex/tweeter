$(document).ready(() => {
  const counter = $('#counter');
  counter.text(charLimit);
  $('#tweet-text').on('input', (e) => {
    const count = charLimit - e.target.value.length;
    counter.text(count);
    if (count < 0) counter.addClass('red');
    if (count >= 0) counter.removeClass('red');
  });
});
