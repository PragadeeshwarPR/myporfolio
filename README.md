# Pragadeeshwar · Portfolio

A personal portfolio in sunshine yellow and warm white, blended with peach, coral, lavender and mint.
Plain HTML, CSS and JavaScript — no build step.

## Run locally
Open `index.html` in a browser.

## Structure
- `index.html` — all content (hero, about, skills, projects, journey, education, contact)
- `style.css` — colours, layout and animations (palette lives in `:root`)
- `script.js` — typing effect, scroll reveals, count-up stats, mobile menu, tilt card
- `assets/` — put your photo, resume and project screenshots here

## Editing tips
- Your photo: drop `assets/me.jpg` in and replace the `<span class="initials">P</span>` in the hero with `<img src="assets/me.jpg" alt="Pragadeeshwar" />`.
- Project screenshots: put an `<img>` inside each `.browser-body`.
- Resume: add `assets/resume.pdf` and point the resume button's `href` at it.

## Blog
The blog runs on Jekyll, which GitHub Pages builds automatically.

- Posts live in `_posts/`, one Markdown file per post, named `YEAR-MONTH-DAY-title.md`.
- Copy `_drafts/POST-TEMPLATE.md` to start a new post. It explains every step.
- The 3 newest posts appear in the "Writing" section on the homepage; all posts are listed at `/blog/`.
- Images for posts go in `assets/` and are linked as `/assets/name.jpg`.
- RSS feed: `/blog/feed.xml`.

Preview locally (optional): `gem install jekyll -v 3.10.0 kramdown-parser-gfm jekyll-feed jekyll-sitemap jekyll-seo-tag webrick`, then `jekyll serve` and open http://localhost:4000/myporfolio/.

## Admin panel (Pages CMS)
`.pages.yml` configures [Pages CMS](https://app.pagescms.org). Sign in with GitHub, choose this repo, open **Blog posts**, and write, edit or delete posts in a visual editor. Photos you add go to `assets/`. Every save is a commit, so the site updates in about a minute.
