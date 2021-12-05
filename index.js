span = document.querySelector('span')
button = document.querySelector('button')
duration = 10; // animation-during

let startTime;

const oneThousand = 1000
toMsecs = (secs) => oneThousand * secs
toSecs = (msecs) => msecs / oneThousand

span.addEventListener('animationstart', () => {
    console.log('animationstart')
    startTime = Date.now();
    console.log('animationstart start: ' + startTime)
    button.style.visibility = 'visible';
});

span.addEventListener('animationiteration', () => console.log('animationiteration'));

function toggleReverse(delay) {
    span.classList.remove('my_anim');
    void span.offsetWidth;
    span.classList.add('my_anim');
    if(delay == null) {
        span.style.animationDelay = `0s`;
    } else {
        span.style.animationDelay = `${delay}s`;
    }
    console.log('animationend before running')
    span.style.animationPlayState = 'running';
}

span.addEventListener('animationend', () => {
    console.log('animationend')
    toggleReverse();
});

button.addEventListener('click', () => {
    const elapsed = Date.now() - startTime;
    const delay = (elapsed < toMsecs(duration)) ? (toSecs(elapsed) - duration * 2) : -duration;
    toggleReverse(delay)
});