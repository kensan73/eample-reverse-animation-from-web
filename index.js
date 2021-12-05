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

function toggleReverse() {
    span.classList.remove('my_anim');
    void span.offsetWidth; // safely apply changes
    span.classList.add('my_anim');
    span.style.animationDelay = `0s`;
    console.log('animationend before running')
    span.style.animationPlayState = 'running';
}

span.addEventListener('animationend', () => {
    console.log('animationend')
    // button.style.visibility = 'hidden';

    toggleReverse();
});

button.addEventListener('click', () => {
    span.classList.remove('my_anim');
    void span.offsetWidth; // safely apply changes
    span.classList.add('my_anim');
    console.log('click start: ' + startTime)
    const elapsed = Date.now() - startTime;
    const delay = (elapsed < toMsecs(duration)) ? (toSecs(elapsed) - duration * 2) : -duration;
    span.style.animationDelay = `${delay}s`;
    console.log('click before running')
    span.style.animationPlayState = 'running';
});