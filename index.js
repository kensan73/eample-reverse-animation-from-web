span = document.querySelector('span')
button = document.querySelector('button')
timeDiv = document.querySelector('#timeElapsedId')
duration = 10; // animation-during

let startTime = Date.now();

const oneThousand = 1000

toMsecs = (secs) => oneThousand * secs
toSecs = (msecs) => msecs / oneThousand
timeElapsed = (startTime) => toSecs(Date.now() - startTime).toPrecision(2)
isForward = () => {
    return timeElapsed(startTime) < 10;
}

setInterval(() => {
    timeDiv.innerHTML = `${timeElapsed(startTime)}s`
}, 500)

span.addEventListener('animationstart', () => {
    startTime = Date.now();
    console.log('isForward: ' + isForward())
});

span.addEventListener('animationiteration', () => {
    console.log('isForward: ' + isForward())
});

function replaceAnim() {
    span.classList.remove('my_anim');
    void span.offsetWidth;
    span.classList.add('my_anim');
    const calculatedDelay = timeElapsed(startTime) - 10
    span.style.animationDelay = `-${calculatedDelay}s`;
    span.style.animationDirection = 'alternate-reverse';
    span.style.animationPlayState = 'running';
}

function toggleReverse(delay) {
    span.classList.remove('my_anim');
    void span.offsetWidth;
    span.classList.add('my_anim');
    if(delay == null) {
        span.style.animationDelay = `0s`;
    } else {
        span.style.animationDelay = `${delay}s`;
    }
    span.style.animationPlayState = 'running';
}

span.addEventListener('animationend', () => {
    toggleReverse();
});

button.addEventListener('click', () => {
    if(!isForward()) {
        // replaceAnim()
        // const elapsed = Date.now() - startTime;
        // const delay = (elapsed < toMsecs(duration)) ? (toSecs(elapsed) - duration * 2) : -duration;
        // toggleReverse(delay)
    } else {
        const elapsed = Date.now() - startTime;
        const delay = (elapsed < toMsecs(duration)) ? (toSecs(elapsed) - duration * 2) : -duration;
        toggleReverse(delay)
    }
});