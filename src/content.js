'use strict';

document.body.innerHTML += `
<df-messenger
  chat-icon="https://storage.googleapis.com/cloudprod-apiai/4af2327e-4141-4e9e-b654-d99f1be6b5e8_x.png"
  intent="WELCOME"
  chat-title="Test"
  agent-id="4a478516-0606-483a-858a-0a528eeecb96"
  language-code="es"
></df-messenger>
`;

const script = document.createElement('script');
script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';

document.head.appendChild(script);
