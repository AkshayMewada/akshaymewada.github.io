# Personal template

A standalone, minimal Jekyll site with original layouts and CSS: white and charcoal colors, gray accents and light-gray surfaces, system sans-serif navigation, Georgia reading text, and a left author profile. No parent theme, icon library, or webfont download is required. The N-Queens game uses its own JavaScript. The white light palette stays consistent regardless of device dark-mode settings.

## Run independently

```sh
cd personal-template
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000. To build: `bundle exec jekyll build`.

Edit `_config.yml` for identity, `_data/navigation.yml` for links, and `assets/css/style.css` for design tokens. Restart Jekyll after config changes. Add Markdown posts to `_posts/` with title and date front matter; an explicit permalink preserves an existing URL. Set `baseurl` when hosting under a repository subpath.

The existing homepage introduction, article, profile photo, and resume are copied here; edits are independent of the parent site. The full homepage, experience timeline, quotes, and N-Queens game are included. Social profile links live in `_data/social.yml`. Sample academic pages are omitted. The existing article permalink is preserved.

This folder is excluded from the parent site's build. To publish it, use this folder as a separate repository or explicitly select it as the deployment source. Nothing has been deployed.

LICENSE is retained from the source repository for provenance. The new layout/CSS files were created for this template; copied personal content and assets retain their existing rights.

## License review

See [LICENSE-AUDIT.md](LICENSE-AUDIT.md) for verified provenance and unresolved asset permissions, and [DEPENDENCY-LICENSES.json](DEPENDENCY-LICENSES.json) for the installed dependency license inventory. These files are excluded from generated site output.
