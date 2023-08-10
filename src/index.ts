import { readFileSync, rmSync, cpSync } from 'fs';
import lib from './lib';
import plugins from './plugins';
import { srcDir, destDir, staticDir } from './azurite.config.json';
import { Plugins } from './types';

(async function main() {
  removeDestinationDirectory(destDir); // initial clean-up
  buildHTML(srcDir, destDir, plugins); // builds the HTML and applies src/plugins
  copyStaticFiles(staticDir, destDir); // copies files from src/static
})();

/**
 * Builds the markdown files into HTML using the markedjs parser.
 *
 * Optionally, parses the outputted HTML with plugins.
 */
function buildHTML(srcDir: string, destDir: string, plugins?: Plugins): void {
  const fileNameList = lib.getFileList(srcDir);
  const srcDirRegExp = new RegExp(`^${srcDir}`);

  fileNameList.forEach((fileName) => {
    const content = readFileSync(fileName, 'utf-8');
    let html = lib.parseMarkdownToHTML(content);

    if (plugins) {
      html = applyPlugins(html, plugins);
    }

    const newFileName = fileName
      .replace(srcDirRegExp, destDir) // src/file.md -> dest/file.md
      .replace(/.md$/, '.html'); // dest/file.md -> dest/file.html
    lib.writeFileRecursive(newFileName, html);
  });
}

/**
 * Copies the files from {staticDir} into the {destDir} root.
 */
function copyStaticFiles(staticDir: string, destDir: string): void {
  const fileNameList = lib.getFileList(staticDir);

  fileNameList.forEach((file) => {
    cpSync(file, file.replace(staticDir, destDir), { recursive: true });
  });
}

/**
 * Applies all plugins in the {plugins} object to create {newHTML}.
 */
function applyPlugins(oldHtml: string, plugins: Plugins): string {
  const pluginNames = Object.keys(plugins);
  let newHTML = oldHtml;
  pluginNames.forEach((name) => {
    newHTML = plugins[name](newHTML);
  });

  return newHTML;
}

/**
 * Removes the {destDir} to rebuild the HTML files and handles any errors.
 */
function removeDestinationDirectory(destDir: string): void {
  try {
    rmSync(destDir, { recursive: true });
  } catch (err: any) {
    if (err.code == 'ENOENT') {
      // creating new destDir
    } else {
      throw err;
    }
  }
}
