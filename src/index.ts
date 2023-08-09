import { marked } from 'marked';
import fs from 'node:fs/promises';
import { readFileSync } from 'fs';
import lib from './lib';

const srcDir = 'notes'; /* the directory of the .md files */
const destDir = 'dist'; /* the build directory for the .html files */

/**
 * Gets the list of files from the {srcDir}, excluding directory/folder entries.
 */
async function getFileList(dirName: string): Promise<string[]> {
  let files: string[] = [];

  const dirEnts = await fs.readdir(dirName, {
    withFileTypes: true,
  });

  for (const item of dirEnts) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }
  return files;
}

/**
 * Builds the markdown files into HTML using the markedjs parser.
 *
 * NOTE: This does not support WikiLinks or Obsidian Callouts.
 */
async function buildMarked(srcDir: string): Promise<void> {
  const fileNameList = await getFileList(srcDir);
  const srcDirRegExp = new RegExp(`^${srcDir}`);

  fileNameList.forEach((fileName) => {
    const text = readFileSync(fileName, 'utf-8');
    const sanitizedText = text.replace(
      /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, // sanitize zero width Unicode characters which interfere with parsing
      ''
    );
    const markedHtml = marked.parse(sanitizedText);
    const newFileName = fileName
      .replace(srcDirRegExp, destDir) // src/file.md -> dest/file.md
      .replace(/.md$/, '.html'); // dest/file.md -> dest/file.html
    lib.writeFileRecursive(newFileName, markedHtml);
  });
}

buildMarked(srcDir);
