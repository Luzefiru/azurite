# azurite

![](./assets/cover.png)

Simply drag & drop all your notes into the `notes/` directory and push it to your own GitHub repository to automatically trigger a GitHub Actions workflow to pulish your notes to GitHub Pages.

Easily customize the stylesheet theme in the `static/css/bundle.css` file.

# Table of Contents

- [Usage](https://github.com/Luzefiru/azurite/tree/main#usage)
  - [Hosting](https://github.com/Luzefiru/azurite/tree/main#hosting)
  - [Development](https://github.com/Luzefiru/azurite/tree/main#hosting)
- [Project Structure](https://github.com/Luzefiru/azurite/tree/main#project-structure)
- [Known Issues](https://github.com/Luzefiru/azurite/tree/main#known-issues)
- [Contributing](https://github.com/Luzefiru/azurite/tree/main#contributing)

# Usage

If you are simply looking for a solution to host your Obsidian notes as fast as possible, follow the [Hosting Setup](https://github.com/Luzefiru/azurite/tree/main#hosting).

Otherwise, if you are trying to tinker with the build process and would like to customize the `src/static/stylesheet.css`, `index.html`, and `404.html` pages, follow the [Development Setup](https://github.com/Luzefiru/azurite/tree/main#development).

### Hosting

1. Fork this repository on GitHub.

2. Change your forked repository's `Settings > Actions > General > Workflow Permissions > Read and write permissions` to true & save your changes.

3. Upload your notes to the `notes/` directory and wait for the GitHub action to trigger & fail.

4. Change your `Settings > Pages > Branch` to `gh-pages` and re-run the GitHub action.

5. Find your notes at `https://{YOUR_NAME}.github.io/azurite/`.

### Development

1. Fork this repository on GitHub.

2. Run these commands in a shell with Git.

```bash
git clone https://github.com/{YOUR_NAME}/azurite.git # don't include the { } characters
cd azurite
npm run install
```

3. Edit the `src/` directory files to your liking.

```bash
npm run serve # your site is hosted on http://localhost:8080/azurite/ by default
```

4. Follow [Hosting Setup](https://github.com/Luzefiru/azurite/tree/main#hosting) step 3.

# Project Structure

```
.
├── notes/                    # Default source directory of .md note files for building
│
├── static
│   │── assets/         # Files that are copied to the _site directory that can be accessed with {{assets}}/
│   │── css/bundle.css  # The main stylesheet applied to all pages
│   │── pages/          # HTML files that are copied to the notes/ directory for processing
│   └── *.njk           # Template files used for Markdown layout preprocessing with Nunjucks
│
├── eleventy.config.js  # 11ty configuration, change the settings here
```

# Known Issues

- can't render images
- bad UX
- can't render `[!callout]` blockquotes.

# Contributing

Feel free to contribute by making a pull request or raising an issue.
