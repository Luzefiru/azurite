import getFileList from '../lib/getFileList';
import { srcDir, destDir } from '../azurite.config.json';

interface File {
  title: string | null; // title of the HTML page
  relativePath: string | null; // path relative to destDir
  rawPath: string; // full path in the format: {destDir}/*
}

/**
 * Creates an array of File objects based on the stucture of the {dir}, relative to {dir}.
 */
const getFileLocations = (srcDir: string, destDir: string): File[] => {
  const files = getFileList(srcDir);
  const titleRegEx = new RegExp(`([^/]+)\.md`, 'g'); // matches the TITLE in srcDir/[TITLE].md
  const srcDirRegEx = new RegExp(`^${srcDir}\/`);

  const titles = files.map((str) => {
    titleRegEx.lastIndex = 0;
    const match = titleRegEx.exec(str);
    return match ? match[1] : null;
  });

  const filesWithPaths = files.map((rawPath, i) => {
    return {
      title: titles[i],
      relativePath: encodeURIComponent(rawPath)
        .replace(/%2F/g, '/')
        .replace(srcDirRegEx, `/${destDir}/`)
        .replace(/.md/, '.html'),
      rawPath: rawPath,
    };
  });
  // console.log(filesWithPaths);
  return filesWithPaths;
};

/**
 * Resolves WikiLinks to HTML Anchor Tags.
 *
 * Example:
 *
 * `[[WikiLink|Label]] -> <a href="./WikiLink">Label</a>`
 *
 * Dependencies:
 *  - src/static/404.html file
 */
const filesWithMetadata = getFileLocations(srcDir, destDir);
const resolveWikiLinks = (html: string): string => {
  const wikiLinkRegEx = /\[\[([^\|\]]+)(?:\|([^\]]+))?\]\]/g; // matches [[Link|Label]]

  return html.replace(wikiLinkRegEx, (match, link, label) => {
    const relativePath =
      filesWithMetadata.find((file) => file.title === link)?.relativePath ||
      `404.html`;

    const linkText = label || link;
    const anchorTag = `<a href="${relativePath}">${linkText}</a>`;
    return anchorTag;
  });
};

export default resolveWikiLinks;
