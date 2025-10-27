const body = document.body;
const switchLabel = document.querySelector('header .mode-switch');
const checkbox = switchLabel?.querySelector('input[type="checkbox"]');

switchLabel.onchange = (event) => {
  event.stopPropagation();
  const checked = event.target.checked;
  switchLabel.dispatchEvent(
    new CustomEvent('darkmode:toggle', { bubbles: true, detail: { checked } })
  );
};

body.addEventListener('darkmode:toggle', (event) => {
  body.classList.toggle('dark-mode', !!event.detail?.checked);
});