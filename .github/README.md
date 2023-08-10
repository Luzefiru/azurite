# azurite

![](./assets/cover.png)

Easily host Markdown Files in GitHub pages with plug-and-play parsing steps.

## Table of Contents

- [Usage](https://github.com/Luzefiru/azurite/tree/main#usage)
  - [Hosting](https://github.com/Luzefiru/azurite/tree/main#hosting)
  - [Development](https://github.com/Luzefiru/azurite/tree/main#hosting)
- [Project Structure](https://github.com/Luzefiru/azurite/tree/main#project-structure)
- [How It Works](https://github.com/Luzefiru/azurite/tree/main#how-it-works)
  - [Tips for Customizing the Build Process](https://github.com/Luzefiru/azurite/tree/main#tips-for-customizing-the-build-process)
- [Known Issues](https://github.com/Luzefiru/azurite/tree/main#known-issues)
- [Contributing](https://github.com/Luzefiru/azurite/tree/main#contributing)

## Usage

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
npm run build # builds your srcDir to the destDir and copies files from staticDir
```

4. Follow [Hosting Setup](https://github.com/Luzefiru/azurite/tree/main#hosting) step 3.

# Project Structure

```
.
├── notes/                    # Default source directory of .md note files for building
│
├── src
│   │── lib/                  # Shared utils used in the source code
│   │── plugins/              # Functions that are used during the HTML build step
│   │── static/               # Files that will be copied to the root of the build directory
│   └── azurite.config.json   # Files that will be copied to the root of the build directory
│
├── tsconfig.json
```

## How It Works

The `src/index.ts` program is run when you do `npm run build`. It builds the Markdown files in the `azurite.config.json` `srcDir` into `destDir` and copies the static files inside `staticDir` to `destDir`.

The `buildHTML` function cycles through each of the plugin functions exported in `src/plugins/index.ts` which are functions with the signature `(html: string) => string`.

By default the plugins do the following:

1. `resolveWikiLinks` - Resolves WikiLinks to HTML Anchor Tags.
2. `removeMetadata` - Deletes all text content & YAML front matter all the way until before the first `<h1> ... </h1>` tag. This was done because I haven't implemented handling for said metadata and it varies across notetaking systems.
3. `resolveCallouts` - Resolves all `[!calloutType] ...` to `<p class="calloutType> ... </p>`.
4. `addHeadTag` - Injects the outputted HTML into a template defined inside the function which gives it the `<head>` metadata and link to the `src/static/stylesheet.css`.

The output should be a `build/` directory (by default) with all the HTML files and directories mirroring the `notes/` Markdown files directory together with the `src/static` files.

This `build/` directory is then automatically deployed using a GitHub Actions workflow found in `.github/workflows/CD.yml` which publishes the `publish_dir` (set to `build`) by default.

## Tips for Customizing the Build Process

- Better to not mess with the `azurite.config.json` file and the default directories.
- Easily customize the `404.html`, `index.html`, and `stylesheet.css` files in the `src/static/` directory.
- Add or remove your plugins & export them inside `src/plugins/index.ts`.
- Customize the `.github/workflows/CD.yml` file to do your own deployment or build strategy.

## Known Issues

- no user navigation menus or buttons
- note template is hardcoded into plugin function when it should be its own static file
- can't render images
- bad UX

## Contributing

Feel free to contribute by making a pull request or raising an issue.
