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

isAlternate = () => {
    // console.log('ISALTERNATEGCS: ' + window.getComputedStyle(span).animationDirection.toUpperCase())
    return window.getComputedStyle(span).animationDirection.toUpperCase() === 'ALTERNATE';
}

isPhase1 = () => {
    return timeElapsed(startTime) < 10
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

function replaceAnim(animationDirection) {
    span.classList.remove('my_anim');
    void span.offsetWidth;
    span.classList.add('my_anim');
    const calculatedDelay = timeElapsed(startTime) // - 10
    span.style.animationDelay = `-${calculatedDelay}s`;
    span.style.animationDirection = animationDirection // 'alternate-reverse';
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
    if(!isAlternate()) {
        if(isPhase1()) {
            console.log('ALTERNATE-REVERSE PHASE 1!')
//            replaceAnim('alternate')
            const elapsed = Date.now() - startTime;
            const delay = (elapsed < toMsecs(duration)) ? (toSecs(elapsed) - duration * 2) : -duration;
            toggleReverse(delay)
        } else { // phase 2
            console.log('ALTERNATE-REVERSE PHASE 2 TODO')
            // is phase 2
            // TODO: put back original anim
            // TODO: then toggleReverse
            replaceAnim('alternate')
        }
    } else {
        if(isPhase1()) {
            console.log('ALTERNATE phase 1')
            const elapsed = Date.now() - startTime;
            const delay = (elapsed < toMsecs(duration)) ? (toSecs(elapsed) - duration * 2) : -duration;
            toggleReverse(delay)
        } else {
            console.log('ALTERNATE phase 2')
            replaceAnim('alternate-reverse')
        }
    }
});