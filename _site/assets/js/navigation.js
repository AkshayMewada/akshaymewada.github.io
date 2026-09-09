document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) dropdown.open = false;
  });

  dropdown.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dropdown.open) {
      dropdown.open = false;
      dropdown.querySelector('summary').focus();
    }
  });

  dropdown.addEventListener('focusout', (event) => {
    if (!dropdown.contains(event.relatedTarget)) dropdown.open = false;
  });
});
