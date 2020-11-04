'use strict';

function sendMessage(message, response) {
    chrome.tabs.query({ currentWindow: true, active: true },
        (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, message, response);
        });
}

function contentLoaded() {
    const disableButton = document.getElementById('disable-bot-button');
    sendMessage({ type: 'IS_BOT_ACTIVE' }, (botActive) => {
        disableButton.innerHTML = botActive ? 'Deshabilitar bot' : 'Habilitar bot';
        disableButton.onclick = () => {
            if (botActive) {
                sendMessage({ type: 'DISABLE_BOT' });
                disableButton.innerHTML = 'Habilitar bot';
            } else {
                sendMessage({ type: 'ENABLE_BOT' });
                disableButton.innerHTML = 'Deshabilitar bot';
            }
            botActive = !botActive;
        };
    });
}

document.addEventListener('DOMContentLoaded', contentLoaded, false);
