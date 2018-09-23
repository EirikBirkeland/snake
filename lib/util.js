export function leadingDebounce(fn, delay) {
    let ready = true;

    return function (...args) {
        if (ready) {
            fn(...args);
            ready = false;
            setTimeout(function () {
                ready = true;
            }, delay);
        }
    };
}
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}