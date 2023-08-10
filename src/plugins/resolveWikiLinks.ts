import getFileList from '../lib/getFileList';
import { destDir } from '../azurite.config.json';

interface File {
  title: string | null;
  relativePath: string | null;
  rawPath: string;
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
    return { title: titles[i], relativePath: relativePaths[i], rawPath };
  });

  console.log(filesWithPaths);
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
  return html;
};

export default resolveWikiLinks;
