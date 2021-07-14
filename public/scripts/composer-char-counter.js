const charLimit = 140;
$(document).ready(() => {
  $('#tweet-text').on('input', (e) => {
    const count = charLimit - e.target.value.length;
    const counter = $('#counter');
    counter.text(count);
    if (count < 0) counter.addClass('red');
    if (count >= 0) counter.removeClass('red');
  });
});
