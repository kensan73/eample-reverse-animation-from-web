span = document.querySelector('span')
button = document.querySelector('button')
timerElement = document.querySelector('#timerId')
duration = 5; // animation-during

let startTime = Date.now();
toSec = (msec) => msec / 1000
elapsedTimeMsec = () => Date.now() - startTime
elapsedTimeSec = () => toSec(elapsedTimeMsec())
updateTimer = () =>     timerElement.innerHTML = `${elapsedTimeSec().toPrecision(2)}s`

let intervalHandle;

startTimer = () => {
    intervalHandle = window.setInterval(() => {
        updateTimer()
    }, 500)
}

endTimer = () => {
    window.clearInterval(intervalHandle)
    intervalHandle = null
}

span.addEventListener('animationstart', () => {
    startTime = Date.now();
    startTimer()
});

span.addEventListener('animationiteration', () => span.style.animationPlayState = 'paused');

toggleAnimation = () => {
    span.classList.remove('my_anim');
    void span.offsetWidth; // safely apply changes
    span.classList.add('my_anim');
    if(span.style.animationDirection !== 'reverse')
        span.style.animationDirection = 'reverse';
    else
        span.style.animationDirection = 'normal';
    span.style.animationPlayState = 'running';
}
span.addEventListener('animationend', () => {
    // console.log('animationend')
    endTimer()
    updateTimer()

    toggleAnimation();
});

button.addEventListener('click', () => {
    // wont work anymore since i changed anim to forward
    span.classList.remove('my_anim');
    void span.offsetWidth; // safely apply changes
    span.classList.add('my_anim');
    const elapsed = Date.now() - startTime;
    const delay = (elapsed < duration * 1000) ? (elapsed / 1000 - duration * 2) : -duration;
    span.style.animationDelay = `${delay}s`;
    span.style.animationPlayState = 'running';
});