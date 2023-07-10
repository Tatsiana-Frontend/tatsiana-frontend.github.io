import playList from './playList.js';

const time = document.querySelector('.time');
const dateToday = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
let randomNum = getRandomNum(1, 20);
city.value = localStorage.getItem('city') || 'Минск';
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let isPlay = false;
const audio = new Audio();
const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
let playNum = 0;
audio.src = playList[playNum].src;
const playListContainer = document.querySelector('.play-list');
const songCurrentTime = document.querySelector('.current');
const songLength = document.querySelector('.length');
const timeline = document.querySelector('.player-timeline');
const playerProgress = document.querySelector('.player-progress');
const volumeSlider = document.querySelector('.volume-slider');
const volumeValue = document.querySelector('.volume-value');
const volumeBtn = document.querySelector('.volume');
const currentSongTitle = document.querySelector('.currentSongTitle');


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setBg();
    setTimeout(showTime, 1000);
  }

showTime();

function showDate() {
  const date = new Date();
  const options = {month: 'long', day: 'numeric', weekday: 'long'};
  const currentDate = date.toLocaleDateString('ru-RU', options);
  dateToday.textContent = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    return 'night';
  } else if (hours >= 6 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else if (hours >= 18 && hours < 23) {
    return 'evening';
  } else {
    return 'night';
  }
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
}

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorage);

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
  const timeOfDay = getTimeOfDay();
  let bgNum = randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlideNext() {
  if ( randomNum < 20 ) {
    randomNum++;
  } else {
    randomNum = 1;
  }
  return randomNum;
}

function getSlidePrev() {
  if ( randomNum > 1 ) {
    randomNum--;
  } else {
    randomNum = 20;
  }
  return randomNum;
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

async function getWeather() {
  try {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=eb2b5c3570a97575c748f0f00e4318f8&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/c`;
  humidity.textContent = `Влажность: ${Math.round(data.main.humidity)} %`;
  weatherError.textContent = '';
  } catch (err) {
    weatherError.textContent = `Ошибка! Город "${city.value.toUpperCase()}" не найден!`;
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

async function getQuotes() {
  const quotes = 'js/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const numOfQuote = getRandomNum(0, data.length-1);
  quote.textContent = data[numOfQuote].text;
  author.textContent = data[numOfQuote].author;
}
document.addEventListener('DOMContentLoaded', getQuotes);
changeQuote.addEventListener('click', getQuotes);

playList.forEach(el => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  li.classList.add('play-item');
  btn.classList.add('play-item-btn');
  li.textContent = el.title;
  playListContainer.append(li);
  li.append(btn);
});

const playItem = document.querySelectorAll('.play-item');

setInterval(() => {
  playerProgress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  songCurrentTime.textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) {
  return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  } else {
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;}
}

audio.addEventListener('loadeddata', () => {
    songLength.textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = 0.75;
  },
  false
);

timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  volumeValue.style.width = newVolume * 100 + '%';
}, false);


function volumeMute () {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeBtn.style.backgroundImage = 'url(./assets/svg/mute.svg)';
  } else {
    volumeBtn.style.backgroundImage = 'url(./assets/svg/volume.svg)';
  }
}

volumeBtn.addEventListener('click', volumeMute);

const playItemBtn = document.querySelectorAll('.play-item-btn');

function playAudio() {
  if(!isPlay) {
    audio.play();
    isPlay = true;
    play.style.backgroundImage = 'url(./assets/svg/pause.svg)';
    playItemBtn[playNum].style.backgroundImage = 'url(./assets/svg/pause.svg)';
    playItem[playNum].classList.add('active');
  } else if (isPlay) {
    audio.pause();
    isPlay = false;
    play.style.backgroundImage = 'url(./assets/svg/play.svg)';
    playItemBtn[playNum].style.backgroundImage = 'url(./assets/svg/play.svg)';
  }
}

play.addEventListener('click', playAudio);

playItemBtn.forEach((e, i) => {
  e.addEventListener('click', () => {
    if (i == playNum && isPlay == false) {
      audio.play();
      e.style.backgroundImage = 'url(./assets/svg/pause.svg)';
      play.style.backgroundImage = 'url(./assets/svg/pause.svg)';
      isPlay = true;
    } else if (i == playNum && isPlay == true) {
      audio.pause();
      e.style.backgroundImage = 'url(./assets/svg/play.svg)';
      play.style.backgroundImage = 'url(./assets/svg/play.svg)';
      isPlay = false;
    } else if (i !== playNum) {
      playItemBtn.forEach(el => el.style.backgroundImage = 'url(./assets/svg/play.svg)');
      playNum = i;
      audio.src = playList[playNum].src;
      audio.play();
      e.style.backgroundImage = 'url(./assets/svg/pause.svg)';
      play.style.backgroundImage = 'url(./assets/svg/pause.svg)';
      isPlay = true;
    }
    playItem.forEach(e => e.classList.remove('active'));
    playItem[playNum].classList.add('active');
    showSongTitle();
  });
});

function playNext () {
  if ( playNum < playList.length-1 ) {
    ++playNum;
  } else {
    playNum = 0;
  }
  isPlay = true;
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  play.style.backgroundImage = 'url(./assets/svg/pause.svg)';
  playItemBtn.forEach(el => el.style.backgroundImage = 'url(./assets/svg/play.svg)');
  playItemBtn[playNum].style.backgroundImage = 'url(./assets/svg/pause.svg)';
  playItem.forEach(e => e.classList.remove('active'));
  playItem[playNum].classList.add('active');
  audio.play();
  showSongTitle();
}

function playPrev () {
  if ( playNum > 0 ) {
    --playNum;
  } else {
    playNum = 3;
  }
  isPlay = true;
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  play.style.backgroundImage = 'url(./assets/svg/pause.svg)';
  playItemBtn.forEach(el => el.style.backgroundImage = 'url(./assets/svg/play.svg)');
  playItemBtn[playNum].style.backgroundImage = 'url(./assets/svg/pause.svg)';
  playItem.forEach(e => e.classList.remove('active'));
  playItem[playNum].classList.add('active');
  audio.play();
  showSongTitle();
}

playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

audio.addEventListener('ended', playNext);

function showSongTitle () {
  currentSongTitle.textContent = playList[playNum].title;
}

showSongTitle();