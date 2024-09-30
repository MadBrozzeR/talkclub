import { Splux } from 'splux';
window.addEventListener('load', function () {
    const rootElement = document.getElementById('board');
    if (!rootElement) {
        throw new Error('Root element is not ready');
    }
    rootElement.innerText = '';
    const splux = new Splux(rootElement, null);
    splux.dom('div').params({ innerText: 'Hello, Splux!' });
});
