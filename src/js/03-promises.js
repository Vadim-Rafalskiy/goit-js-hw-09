import { Notify } from 'notiflix/build/notiflix-notify-aio';

// --- refs ---

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};

// --- eventLisieners ---

refs.form.addEventListener('submit', fnf);

// --- function ---

function fnf(e) {
  e.preventDefault();

  let delay = e.target.delay.valueAsNumber;
  const stepDelay = e.target.step.valueAsNumber;
  const amount = e.target.amount.valueAsNumber;

  for (let i = 0; i < amount; i++) {
    i > 0 ? (delay += stepDelay) : delay;
    const position = i + 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
            timeout: delay,
          });
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
            timeout: delay,
          });
        }, delay);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const param = {
    position,
    delay,
  };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(param); // Fulfill
    } else {
      reject(param); // Reject
    }
  });
}
