import { showOverlay, hideOverlay } from './Overlay'; 

let connecting = false;

function handleClosing(btn, receivedToken) {
  if (connecting) {
    hideOverlay();
    btn.innerText = 'Connect to Formable';
    connecting = false;

    if (receivedToken) {
      window.location = `${window.location.href}&receivedToken=${receivedToken}`;
    }
  }
}

function openFormableConnect(btn) {
  const menuWidth = 160;
  const popUpWidth = 800;
  const popUpHeight = 780;

  const left = 
    (window.screenX | window.screenLeft) + 
    menuWidth + 
    ((window.innerWidth - menuWidth) / 2) - 
    (popUpWidth / 2);
  const top = (window.screenY | window.screenTop) + 200;
  const siteName = document.querySelector('#wp-admin-bar-site-name a').innerText;

  const windowObjectReference = window.open(
    `${FORMABLE_URL}/connect?type=wordpress&name=${siteName}`,
    'formable-connect',
    `width=${popUpWidth},height=${popUpHeight},left=${left},top=${top},resizable,scrollbars=yes,status=1`,
  );

  const waitForConnection = setInterval(() => {
    windowObjectReference.postMessage(JSON.stringify({ type: 'CONNECT' }), FORMABLE_URL);
  }, 1000);

  const waitForClosing = setInterval(() => {
    if (windowObjectReference.closed) {
      clearInterval(waitForClosing);
      handleClosing(btn);
    }
  }, 500);

  window.addEventListener('message', (event) => {
    if (typeof event.data !== 'string') {
      return;
    }

    const message = JSON.parse(event.data);

    switch (message.type) {
        case "GIVE_TOKEN":
          handleClosing(btn, message.token);
          break;
        case 'CONNECTED':
          clearInterval(waitForConnection);
          break;
        default:
          console.info(message);
          break;
    }
  });
}

function connectToFormable(btn) {
  if (!connecting) {
    connecting = true;

    // set connecting text
    btn.innerText = 'Connecting to Formable...';

    showOverlay();

    openFormableConnect(btn);
  }
}

function onButtonClick(btn) {
  return function connectToFormableWrapper() {
    connectToFormable(btn);
  };
}

function bindConnectButton() {
  const connectBtn = document.getElementById('formable-connect-btn');

  if (!connectBtn) {
    return;
  }

  connectBtn.addEventListener('click', onButtonClick(connectBtn));
}

export default bindConnectButton;
