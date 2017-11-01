function bindShortcode(element) {
  element.addEventListener('click', () => {
    element.select();
  });
}

export default function Shortcodes() {
  const shortcodes = document.querySelectorAll('.formable-shortcodes input');

  for (let i = 0; i < shortcodes.length; i++) {
    bindShortcode(shortcodes[i]);
  }
}
