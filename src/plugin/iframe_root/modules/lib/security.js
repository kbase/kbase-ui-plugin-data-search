define(['uuid'], (Uuid) => {
    'use strict';

    /**
     *
     * @param {string} possibleHTML - a string which may contain html markup
     * @returns A string in which all html markup has been encoded.
     *
     * This works by setting 
     */
    function encodeHTML(possibleHTML) {
        const node = document.createElement('div');
        // xss safe
        node.innerText = possibleHTML;
        return node.innerHTML;
    }
    function scrubHighlight(highlight) {
        const emStart = new Uuid(4).format();
        const emFinish = new Uuid(4).format();
        // xss safe (false positive)
        const safe1 = highlight.replaceAll('<em>', emStart).replaceAll('</em>', emFinish);
        const safe2 = encodeHTML(safe1);
        // xss safe (false positive)
        return safe2.replaceAll(emStart, '<em>').replaceAll(emFinish, '</em>');
    }

    return {encodeHTML, scrubHighlight};
});