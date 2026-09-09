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
    // Safari may blur the summary without focusing a clicked link. Keep the
    // menu visible until that click finishes; outside clicks are handled above.
    if (event.relatedTarget && !dropdown.contains(event.relatedTarget)) {
      dropdown.open = false;
    }
  });
});
