import flatpickr from 'flatpickr';
import { Report } from 'notiflix/build/notiflix-report-aio';

import 'flatpickr/dist/flatpickr.min.css';

//------------------------ Refs -----------------------------------

const refs = {
  buttonStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.buttonStart.disabled = true;

//---------------- flatpickr Options -------------------------------

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Report.failure('Please choose a date in the future');

      refs.buttonStart.disabled = true;
    } else {
      refs.buttonStart.disabled = false;
      refs.buttonStart.addEventListener('click', () => {
        onTimer(selectedDates[0]);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

//--------------------------------------------------------------

function render(param) {
  const { days, hours, minutes, seconds } = param;
  refs.days.textContent = days < 10 ? `0${days}` : days;
  refs.hours.textContent = hours < 10 ? `0${hours}` : hours;
  refs.minutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
  refs.seconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function onTimer(ms) {
  refs.buttonStart.disabled = true;
  const timerId = setInterval(() => {
    const timerValue = ms - Date.now();

    render(convertMs(timerValue));
    if (timerValue <= 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
