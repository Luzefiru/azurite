import { readFileSync, rmSync } from 'fs';
import lib from './lib';
import { srcDir, destDir } from './azurite.config.json';

(async function main() {
  rmSync(destDir, { recursive: true });
  await buildHTML(srcDir, destDir);
})();

/**
 * Builds the markdown files into HTML using the markedjs parser.
 *
 * NOTE: This does not support WikiLinks or Obsidian Callouts.
 */
async function buildHTML(srcDir: string, destDir: string): Promise<void> {
  const fileNameList = await lib.getFileList(srcDir);
  const srcDirRegExp = new RegExp(`^${srcDir}`);

  fileNameList.forEach((fileName) => {
    const content = readFileSync(fileName, 'utf-8');
    const html = lib.parseMarkdownToHTML(content);
    const newFileName = fileName
      .replace(srcDirRegExp, destDir) // src/file.md -> dest/file.md
      .replace(/.md$/, '.html'); // dest/file.md -> dest/file.html
    lib.writeFileRecursive(newFileName, html);
  });
}
