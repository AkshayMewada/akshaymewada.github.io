# Personal template

A minimal Jekyll template for a personal website with a profile, blog, experience timeline, and games.

The header includes a Night mode toggle. New visitors start in normal (light) mode; their selection is saved in browser storage for subsequent visits. Both palettes can be customized in `assets/css/style.css`.

## Text search notes

Add Markdown articles to `notes/text-searches/` with YAML front matter:

```yaml
---
title: Your article title
description: A short summary for the listing.
---
```

The Text Searches page at `/posts/text-search/` automatically lists these articles alphabetically by title. The folder supplies the note layout and topic through `_config.yml`; an optional `permalink` sets a custom article URL.

## Free license

The repository includes the free [MIT License](LICENSE). Keep its copyright and license notice when reusing covered code. Personal content and third-party assets retain their existing rights.
