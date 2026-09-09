(() => {
  const root = document.documentElement;
  let nightMode = false;

  try {
    nightMode = localStorage.getItem('theme') === 'dark';
  } catch (_) {
    // The toggle still works when browser storage is unavailable.
  }

  root.dataset.theme = nightMode ? 'dark' : 'light';

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    toggle.hidden = false;
    toggle.setAttribute('aria-checked', String(nightMode));
    toggle.addEventListener('click', () => {
      nightMode = !nightMode;
      root.dataset.theme = nightMode ? 'dark' : 'light';
      toggle.setAttribute('aria-checked', String(nightMode));
      try {
        localStorage.setItem('theme', root.dataset.theme);
      } catch (_) {
        // Keep the selection for this page even if it cannot be saved.
      }
    });
  });
})();
