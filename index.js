span = document.querySelector('span')
button = document.querySelector('button')
duration = 10; // animation-during

let startTime;

span.addEventListener('animationstart', () => {
    startTime = Date.now();
    button.style.visibility = 'visible';
});

span.addEventListener('animationiteration', () => span.style.animationPlayState = 'paused');

span.addEventListener('animationend', () => {
    // button.style.visibility = 'hidden';
});

button.addEventListener('click', () => {
    span.classList.remove('my_anim');
    void span.offsetWidth; // safely apply changes
    span.classList.add('my_anim');
    const elapsed = Date.now() - startTime;
    const delay = (elapsed < duration * 1000) ? (elapsed / 1000 - duration * 2) : -duration;
    span.style.animationDelay = `${delay}s`;
    span.style.animationPlayState = 'running';
});