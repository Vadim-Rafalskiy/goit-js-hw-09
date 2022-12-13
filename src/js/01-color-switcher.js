const refs = {
  buttons: document.querySelectorAll('button'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};
refs.buttonStop.setAttribute('disabled', '');

let timerId = null;

refs.buttonStart.addEventListener('click', onStart);
refs.buttonStop.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStart.setAttribute('disabled', '');
  refs.buttonStop.removeAttribute('disabled');
}

function onStop() {
  clearInterval(timerId);
  refs.buttonStart.removeAttribute('disabled');
  refs.buttonStop.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
