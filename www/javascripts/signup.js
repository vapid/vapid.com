document.addEventListener('DOMContentLoaded', () => {
  const $form = document.querySelector('form[name=signup]');
  const $email = $form.querySelector('input[type=email]');
  const $submit = $form.querySelector('input[type=submit]');
  const $flash = document.querySelector('#flash');
  const originalSubmit = $submit.value;

  function flash(message) {
    $flash.innerText = message;
    $flash.style.display = 'block';
  }

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    const request = new XMLHttpRequest();
    const params = {
      email: $email.value,
      referral: window.Rewardful ? Rewardful.referral : '',
    };
    const body = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    $flash.style.display = 'none';
    $submit.value = "Signing up...";

    request.open('POST', $form.action, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = () => {
      $email.value = '';
      $submit.value = originalSubmit;
      flash(JSON.parse(request.responseText).message);
    }

    request.onerror = (e) => {
      flash('Sorry, an error occured. Please contact us at hello@vapid.com.');
    };

    request.send(body);
  });
});