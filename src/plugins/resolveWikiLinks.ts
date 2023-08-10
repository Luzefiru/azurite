import getFileList from '../lib/getFileList';
import { destDir } from '../azurite.config.json';

interface File {
  title: string | null; // title of the HTML page
  relativePath: string | null; // path relative to destDir
  rawPath: string; // full path in the format: {destDir}/*
}

/**
 * Creates an array of File objects.
 */
const getFileLocations = async (): Promise<File[]> => {
  const files = await getFileList(destDir);
  const titleRegEx = new RegExp(`${destDir}\/([^/]+)\.html`, 'g'); // matches the TITLE in destDir/[TITLE].html
  const relativeRegEx = new RegExp(`${destDir}\/([^/]+)`, 'g'); // matches the FILE in destDir/[FILE]

  const titles = files.map((str) => {
    titleRegEx.lastIndex = 0;
    const match = titleRegEx.exec(str);
    return match ? match[1] : null;
  });

  const relativePaths = files.map((str) => {
    relativeRegEx.lastIndex = 0;
    const match = relativeRegEx.exec(str);
    return match ? `./${match[1]}` : null;
  });

  const filesWithPaths = files.map((rawPath, i) => {
    return {
      title: titles[i],
      relativePath: encodeURIComponent(relativePaths[i] as string).replace(
        /%2F/,
        '/'
      ),
      rawPath,
    };
  });

  return filesWithPaths;
};

/**
 * Resolves WikiLinks to HTML Anchor Tags.
 *
 * Example:
 *
 * `[[WikiLink|Label]] -> <a href="./WikiLink">Label</a>`
 */
const resolveWikiLinks = (html: string): string => {
  const regex = /\[\[([^\|\]]+)(?:\|([^\]]+))?\]\]/g; // matches [[Link|Label]]

  return html.replace(regex, (match, link, label) => {
    console.log(match, link, label);
    const linkText = label || link;
    const anchorTag = `<a href="./${link}">${linkText}</a>`;
    return anchorTag;
  });
};

export default resolveWikiLinks;
