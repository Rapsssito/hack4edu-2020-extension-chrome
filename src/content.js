'use strict';

const BOT_ELEMENT_ID = 'bot-messenger';
const BOT_SCRIPT_ID = 'bot-script-id';
let IS_BOT_ACTIVE = false;

function addBotToPage() {
    // Add bot HTML
    document.body.innerHTML += `
        <df-messenger
          id="${BOT_ELEMENT_ID}"
          chat-icon="https://github.com/Rapsssito/hack4edu-2020-extension-chrome/raw/main/icon-36.png"
          intent="WELCOME"
          chat-title="MiM"
          agent-id="4a478516-0606-483a-858a-0a528eeecb96"
          language-code="es"
          style="z-index: 99"
        ></df-messenger>
    `;

    document.body.innerHTML += `
        <style>
            df-messenger {
            --df-messenger-button-titlebar-color: #ff8661;
            --df-messenger-send-icon: #ff8661;
            }
        </style>
    `;

    // Add script
    const script = document.createElement('script');
    script.id = BOT_SCRIPT_ID;
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    document.head.appendChild(script);
    IS_BOT_ACTIVE = true;

    const dfMessenger = document.querySelector('df-messenger');

    const doc = document;
    // Handle suggestion operations
    dfMessenger.addEventListener('df-chip-clicked', function(event) {
        switch (event.detail.query) {
            case 'Hazlo por mi':
                // Open creation menu
                doc.querySelector('.section-modchooser-text').click();
                break;
        }
    });

    // Mueve el contador de reset a la izquierda, si existe
    try {
        doc.getElementById('resetcountdown').style.left = '0';
        doc.getElementById('resetcountdown').style.right = '';
        doc.getElementById('resetcountdown').style['z-index'] = 1000;
    } catch (error) {
        console.log(error);
    }
}

function removeBotFromPage() {
    const botElement = document.getElementById(BOT_ELEMENT_ID);
    document.body.removeChild(botElement);
    const botScript = document.getElementById(BOT_SCRIPT_ID);
    document.head.removeChild(botScript);
    IS_BOT_ACTIVE = false;
}

function isMoodlePage() {
    const re = new RegExp('moodle-actionmenu');
    const matches = document.documentElement.innerHTML.match(re) || [];
    return matches.length !== 0;
}

// Handle messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'DISABLE_BOT':
            removeBotFromPage();
            break;
        case 'ENABLE_BOT':
            addBotToPage();
            break;
        case 'IS_BOT_ACTIVE':
            sendResponse(IS_BOT_ACTIVE);
            break;
    }
});

function setup() {
    if (isMoodlePage()) addBotToPage();
}

setup();
