(() => {
  const search = document.querySelector('.site-search');
  if (!search) return;
  const input = search.querySelector('input');
  const panel = search.querySelector('.search-panel');
  const status = search.querySelector('.search-status');
  const results = search.querySelector('ul');
  let indexPromise;
  let revision = 0;

  async function update() {
    const current = ++revision;
    const query = input.value.trim().toLowerCase();
    results.replaceChildren();
    panel.hidden = !query;
    if (!query) return;
    status.textContent = 'Searching…';
    try {
      if (!indexPromise) {
        indexPromise = fetch(search.dataset.index).then((response) => {
          if (!response.ok) throw new Error('Search unavailable');
          return response.json();
        }).catch((error) => {
          indexPromise = null;
          throw error;
        });
      }
      const entries = await indexPromise;
      if (current !== revision) return;
      const terms = query.split(/\s+/);
      const matches = entries.filter((entry) => {
        const text = `${entry.title} ${entry.content}`.toLowerCase();
        return terms.every((term) => text.includes(term));
      }).sort((a, b) => Number(b.title.toLowerCase().includes(query)) - Number(a.title.toLowerCase().includes(query)));
      status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'}` : 'No results. Try another search.';
      matches.forEach((entry) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = entry.url;
        const type = document.createElement('span');
        type.className = 'search-type';
        type.textContent = entry.type;
        const title = document.createElement('strong');
        title.textContent = entry.title;
        const preview = document.createElement('span');
        preview.textContent = entry.preview;
        link.append(type, title, preview);
        item.append(link);
        results.append(item);
      });
    } catch {
      if (current === revision) status.textContent = 'Search is unavailable. Please try again.';
    }
  }

  input.addEventListener('input', update);
  input.addEventListener('focus', update);
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      input.focus();
      ++revision;
      panel.hidden = true;
    }
  });
  function close() {
    ++revision;
    panel.hidden = true;
  }
  document.addEventListener('click', (event) => {
    if (!search.contains(event.target)) close();
  });
  search.addEventListener('focusout', (event) => {
    if (!search.contains(event.relatedTarget)) close();
  });
})();
