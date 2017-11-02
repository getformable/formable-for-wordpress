/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Connect = __webpack_require__(1);

var _Connect2 = _interopRequireDefault(_Connect);

var _Unlink = __webpack_require__(3);

var _Unlink2 = _interopRequireDefault(_Unlink);

var _Shortcodes = __webpack_require__(4);

var _Shortcodes2 = _interopRequireDefault(_Shortcodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bootstrap() {
  // prepare connect button
  (0, _Connect2.default)();

  // bind clicks on shortcodes
  (0, _Shortcodes2.default)();

  // bind confirm on unlink button
  (0, _Unlink2.default)();
}

bootstrap();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Overlay = __webpack_require__(2);

var connecting = false;

function handleClosing(btn, receivedToken) {
  if (connecting) {
    (0, _Overlay.hideOverlay)();
    btn.innerText = 'Connect to Formable';
    connecting = false;

    if (receivedToken) {
      window.location = window.location.href + '&receivedToken=' + receivedToken;
    }
  }
}

function openFormableConnect(btn) {
  var menuWidth = 160;
  var popUpWidth = 800;
  var popUpHeight = 780;

  var left = (window.screenX | window.screenLeft) + menuWidth + (window.innerWidth - menuWidth) / 2 - popUpWidth / 2;
  var top = (window.screenY | window.screenTop) + 200;
  var siteName = document.querySelector('#wp-admin-bar-site-name a').innerText;

  var windowObjectReference = window.open("http://localhost:9090" + '/connect?type=wordpress&name=' + siteName, 'formable-connect', 'width=' + popUpWidth + ',height=' + popUpHeight + ',left=' + left + ',top=' + top + ',resizable,scrollbars=yes,status=1');

  var waitForConnection = setInterval(function () {
    windowObjectReference.postMessage(JSON.stringify({ type: 'CONNECT' }), "http://localhost:9090");
  }, 1000);

  var waitForClosing = setInterval(function () {
    if (windowObjectReference.closed) {
      clearInterval(waitForClosing);
      handleClosing(btn);
    }
  }, 500);

  window.addEventListener('message', function (event) {
    if (typeof event.data !== 'string') {
      return;
    }

    var message = JSON.parse(event.data);

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

    (0, _Overlay.showOverlay)();

    openFormableConnect(btn);
  }
}

function onButtonClick(btn) {
  return function connectToFormableWrapper() {
    connectToFormable(btn);
  };
}

function bindConnectButton() {
  var connectBtn = document.getElementById('formable-connect-btn');

  if (!connectBtn) {
    return;
  }

  connectBtn.addEventListener('click', onButtonClick(connectBtn));
}

exports.default = bindConnectButton;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showOverlay = showOverlay;
exports.hideOverlay = hideOverlay;
var WP_ZINDEX = 9990; // lowest possible z-index to be on top of #wpwrap
var overlay = null;

function showOverlay() {
  if (!overlay) {
    var wrap = document.getElementById('wpwrap');

    overlay = document.createElement('div');

    overlay.style.position = 'absolute';
    overlay.style.height = '100%';
    overlay.style.width = '100%';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.zIndex = WP_ZINDEX + 1;

    wrap.appendChild(overlay);
  }

  overlay.style.display = 'block';
}

function hideOverlay() {
  if (overlay) {
    overlay.style.display = 'none';
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bindUnlink;
function bindUnlink() {
  var unlinkButton = document.getElementById('unlink-formable');

  if (!unlinkButton) {
    return;
  }

  unlinkButton.addEventListener('click', function (e) {
    if (!confirm('Are you sure you want to unlink Formable?')) {
      e.preventDefault();
    }
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Shortcodes;
function bindShortcode(element) {
  element.addEventListener('click', function () {
    element.select();
  });
}

function Shortcodes() {
  var shortcodes = document.querySelectorAll('.formable-shortcodes input');

  for (var i = 0; i < shortcodes.length; i++) {
    bindShortcode(shortcodes[i]);
  }
}

/***/ })
/******/ ]);