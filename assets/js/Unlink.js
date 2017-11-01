export default function bindUnlink() {
  const unlinkButton = document.getElementById('unlink-formable');

  if (!unlinkButton) {
    return;
  }

  unlinkButton.addEventListener('click', (e) => {
    if (!confirm('Are you sure you want to unlink Formable?')) {
      e.preventDefault();
    }
  });
}