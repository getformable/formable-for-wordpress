!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=n(1),i=o(r),c=n(3),l=o(c),a=n(4),u=o(a);!function(){(0,i.default)(),(0,u.default)(),(0,l.default)()}()},function(e,t,n){"use strict";function o(e,t){u&&((0,a.hideOverlay)(),e.innerText="Connect to Formable",u=!1,t&&(window.location=window.location.href+"&receivedToken="+t))}function r(e){var t=160+(window.screenX|window.screenLeft)+(window.innerWidth-160)/2-400,n=200+(window.screenY|window.screenTop),r=document.querySelector("#wp-admin-bar-site-name a").innerText,i=window.open("https://app.getformable.com/connect?type=wordpress&name="+r,"formable-connect","width=800,height=600,left="+t+",top="+n+",resizable,scrollbars=yes,status=1"),c=setInterval(function(){i.postMessage(JSON.stringify({type:"CONNECT"}),"https://app.getformable.com")},1e3),l=setInterval(function(){i.closed&&(clearInterval(l),o(e))},500);window.addEventListener("message",function(t){if("string"==typeof t.data){var n=JSON.parse(t.data);switch(n.type){case"GIVE_TOKEN":o(e,n.token);break;case"CONNECTED":clearInterval(c);break;default:console.info(n)}}})}function i(e){u||(u=!0,e.innerText="Connecting to Formable...",(0,a.showOverlay)(),r(e))}function c(e){return function(){i(e)}}function l(){var e=document.getElementById("formable-connect-btn");e&&e.addEventListener("click",c(e))}Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),u=!1;t.default=l},function(e,t,n){"use strict";function o(){if(!c){var e=document.getElementById("wpwrap");c=document.createElement("div"),c.style.position="absolute",c.style.height="100%",c.style.width="100%",c.style.top="0",c.style.left="0",c.style.backgroundColor="rgba(0, 0, 0, 0.6)",c.style.zIndex=i+1,e.appendChild(c)}c.style.display="block"}function r(){c&&(c.style.display="none")}Object.defineProperty(t,"__esModule",{value:!0}),t.showOverlay=o,t.hideOverlay=r;var i=9990,c=null},function(e,t,n){"use strict";function o(){var e=document.getElementById("unlink-formable");e&&e.addEventListener("click",function(e){confirm("Are you sure you want to unlink Formable?")||e.preventDefault()})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){"use strict";function o(e){e.addEventListener("click",function(){e.select()})}function r(){for(var e=document.querySelectorAll(".formable-shortcodes input"),t=0;t<e.length;t++)o(e[t])}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r}]);