'use strict';

const BOT_ELEMENT_ID = 'bot-messenger';
const BOT_SCRIPT_ID = 'bot-script-id';
let IS_BOT_ACTIVE = false;

function addBotToPage() {
    // Add bot HTML
    document.body.innerHTML += `
        <df-messenger
          id="${BOT_ELEMENT_ID}"
          chat-icon="https://storage.googleapis.com/cloudprod-apiai/4af2327e-4141-4e9e-b654-d99f1be6b5e8_x.png"
          intent="WELCOME"
          chat-title="Test"
          agent-id="4a478516-0606-483a-858a-0a528eeecb96"
          language-code="es"
          style="z-index: 99"
        ></df-messenger>
    `;

    // Add script
    const script = document.createElement('script');
    script.id = BOT_SCRIPT_ID;
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    document.head.appendChild(script);
    IS_BOT_ACTIVE = true;
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
