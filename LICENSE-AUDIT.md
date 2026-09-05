# License and provenance audit

Date: 2026-09-05. Scope: `personal-template/` source, assets, repository history, and the locally resolved Ruby dependency bundle. Generated `_site/` output and installed gem source trees were not audited for every embedded copyright notice. This is a provenance review, not legal clearance or a security audit.

## Findings

| Component | Evidence and status | Action |
| --- | --- | --- |
| `_layouts/*.html`, `assets/css/style.css`, starter pages and config | Created during this project; no Medium source code or stylesheet was imported. Similar visual conventions do not establish a copied-code origin. No originality guarantee or exhaustive similarity search. | Keep a clear distinction between new files and inherited code. Choose an explicit license for newly authored code before distributing as a reusable theme. |
| `LICENSE` | Exact inherited MIT notice, copyright 2016 Michael Rose. | Retain it for inherited material. It does not prove ownership of every asset or automatically license third-party media. |
| `_includes/n-queens.html`, `_includes/timeline.html` | Copied from the parent repository, then adapted. Git history records an introduction in commit `68ce346` by Akshay, “Modified with own details and added CV”. No file-specific license/source notice was found. | Retain the repository notice. Confirm these components were authored by you or identify any external source; a commit author is not proof of original authorship. |
| `_includes/social-icon.html` | Inline SVG geometry added during this conversation without a recorded upstream source/license. | Unverified. Replace with a documented licensed icon set and preserve its notices, or use text-only links. Brand/trademark rules remain separate. |
| `assets/images/avenger.gif` | Copied from the parent repository; no permission record located. Filename is not proof of ownership or of the depicted content. | Confirm source and permission or replace with an original celebration graphic. |
| `assets/postimages/full-stack-machine-learning-2.jpg`, `full-stack-machine-learning-3.jpg` | Copied article illustrations; no source/license record located. | Confirm authorship or permission for each image. |
| `assets/postimages/full-stack-machine-learning.jpg` | Copied asset; no reference found in the current template source. No source/license record located. | Consider removing this unused asset after confirming it is unnecessary. |
| `assets/images/profile.jpg`, `files/resume.pdf` | Personal materials supplied through your repository. Ownership and photographer/embedded asset permissions not independently verified. | Confirm you have publication rights; do not package personal material as freely reusable theme samples without an explicit decision. |
| `_posts/2020-08-08-fullstack-machine-learning.md`, `index.md` | User-supplied article/homepage text; quotes and illustrations may have separate origins. | Confirm original authorship and permissions for embedded content. Attributing a quote alone does not establish permission; quotation exceptions depend on context and jurisdiction. |
| Fonts | CSS references locally installed system fonts and Georgia; no font binaries are bundled. | No redistributed font files found. Recheck licensing if webfonts are added later. |
| Ruby gems | 32 resolved packages (including Bundler); all report license metadata. Exact versions and declared licenses are recorded in `DEPENDENCY-LICENSES.json`. | Metadata is an inventory, not a substitute for reviewing actual license/NOTICE files when redistributing dependencies. |

## Dependency observations

Jekyll, jekyll-feed, jekyll-sitemap and kramdown-parser-gfm declare MIT. The bundle also contains Apache-2.0, BSD and Ruby license declarations. EventMachine lists Ruby and GPL-2.0; multiple identifiers must not be interpreted as requiring every license simultaneously without checking the package's actual terms. These are build/server dependencies, rather than evidence that the generated site's content has been relicensed.

Upstream references checked:

- https://github.com/jekyll/jekyll
- https://github.com/jekyll/jekyll-feed
- https://github.com/jekyll/jekyll-sitemap

Additional dependency homepages are in the JSON inventory. Full bundled license texts and transitive embedded components were not inspected. If distributing a Docker image, installed gems, or vendor directory, review and retain the applicable package license and NOTICE files.

## Outcome

No evidence of imported Medium theme source was found in the standalone template. Existing MIT provenance is documented, but the project is **not fully cleared for redistribution**: image/GIF permissions, icon provenance, and authorship of copied personal components remain unverified. No assets were deleted and no new license was imposed by this audit.
