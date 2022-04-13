define(['uuid'], (Uuid) => {
    'use strict';

    function encodeHTML(possibleHTML) {
        const node = document.createElement('div');
        node.innerHTML = possibleHTML;
        return node.innerText;
    }
    function scrubHighlight(highlight) {
        const emStart = new Uuid(4).format();
        const emFinish = new Uuid(4).format();

        const safe1 = highlight.replace('<em>', emStart).replace('</em>', emFinish);
        const safe2 = encodeHTML(safe1);
        return safe2.replace(emStart, '<em>').replace(emFinish, '</em>');
    }

    return {encodeHTML, scrubHighlight};
});