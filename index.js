span = document.querySelector('span')
button = document.querySelector('button')
timerElement = document.querySelector('#timerId')
duration = 3; // animation-during

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

toggleAnimation = (shouldDelay) => {
    span.classList.remove('my_anim');
    void span.offsetWidth;
    span.classList.add('my_anim');
    if(span.style.animationDirection !== 'reverse')
        span.style.animationDirection = 'reverse';
    else
        span.style.animationDirection = 'normal';
    if(shouldDelay !== null && shouldDelay) {
        span.style.animationDelay = `-${elapsedTimeSec()}s`;
    } else {
        span.style.animationDelay = `0s`;
    }
    span.style.animationPlayState = 'running';
}
span.addEventListener('animationend', () => {
    endTimer()
    updateTimer()

    toggleAnimation();
});

button.addEventListener('click', () => {
    endTimer()
    updateTimer()
    toggleAnimation(true) // todo pass in delay!
});