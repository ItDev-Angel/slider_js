const container = document.querySelector('#slider');
const slides = container.querySelectorAll('.slide');
const indicatorsContainer = container.querySelector('#indicators-container');
const indicators = indicatorsContainer.querySelectorAll('.indicator');
const pauseBtn = container.querySelector('#pause-btn');
const prevBtn = container.querySelector('#prev-btn');
const nextBtn = container.querySelector('#next-btn');

const SLIDES_COUNT = slides.length;
const CODE_LEFT_ARROW = 'ArrowLeft';
const CODE_RIGHT_ARROW = 'ArrowRight';
const CODE_SPACE = 'Space';
const PAUSE = '<i class="far fa-pause-circle"></i>';
const PLAY = '<i class="far fa-play-circle"></i>';

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;
let swipeStartX = null;
let swipeEndX = null;

function gotoNth(n) {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
}
const gotoPrev = () => gotoNth(currentSlide - 1);
const gotoNext = () => gotoNth(currentSlide + 1);

function pause(){
  isPlaying = false;
  pauseBtn.innerHTML = PLAY;
  clearInterval(timerID);
}
function play(){
  isPlaying = true;
  pauseBtn.innerHTML = PAUSE;
  timerID = setInterval(gotoNext, interval);
}
const pausePlay = () => isPlaying ? pause() : play();
function prev(){
  pause();
  gotoPrev();
}
function next(){
  pause();
  gotoNext();
}
function indicate(e){
  const target = e.target;
  if(target.classList.contains('indicator')){
    pause();
    gotoNth(+ target.dataset.slideTo)
  }
}
function pressKey(e){
  if(e.code === CODE_LEFT_ARROW) prev();
  if(e.code === CODE_RIGHT_ARROW) next();
  if(e.code === CODE_SPACE) pausePlay();
}
function swipeStart(e) {
  swipeStartX = e.changedTouches[0].pageX;
}
function swipeEnd(e) {
  swipeEndX = e.changedTouches[0].pageX;
  if(swipeStartX - swipeEndX > 100)next();
  if(swipeStartX - swipeEndX < -100)prev();
}
pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
indicatorsContainer.addEventListener('click', indicate);
document.addEventListener('keydown', pressKey);
container.addEventListener('touchstart', swipeStart);
container.addEventListener('touchend', swipeEnd);
timerID = setInterval(gotoNext, interval);
