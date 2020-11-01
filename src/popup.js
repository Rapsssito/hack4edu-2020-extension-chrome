'use strict';

function contentLoaded() {
    const DISABLE_BOT_BUTTON = document.getElementById('disable-bot-button');
    DISABLE_BOT_BUTTON.onclick = () => {
        chrome.tabs.query({ currentWindow: true, active: true },
            (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'DISABLE-BOT'
                });
            });
    };
}

document.addEventListener('DOMContentLoaded', contentLoaded, false);
