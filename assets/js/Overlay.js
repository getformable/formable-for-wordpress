const WP_ZINDEX = 9990; // lowest possible z-index to be on top of #wpwrap
let overlay = null;

export function showOverlay() {
  if (!overlay) {
    const wrap = document.getElementById('wpwrap');

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

export function hideOverlay() {
  if (overlay) {
    overlay.style.display = 'none';
  }
}
