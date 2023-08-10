import getFileList from '../lib/getFileList';
import { srcDir } from '../azurite.config.json';

interface File {
  title: string | null; // title of the HTML page
  relativePath: string | null; // path relative to destDir
  rawPath: string; // full path in the format: {destDir}/*
}

/**
 * Creates an array of File objects based on the stucture of the {dir}, relative to {dir}.
 */
const getFileLocations = (dir: string): File[] => {
  const files = getFileList(dir);
  const titleRegEx = new RegExp(`${dir}\/([^/]+)\.md`, 'g'); // matches the TITLE in dir/[TITLE].html
  const relativeRegEx = new RegExp(`${dir}\/([^/]+)`, 'g'); // matches the FILE in dir/[FILE]

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
      relativePath: encodeURIComponent(relativePaths[i] as string)
        .replace(/%2F/, '/')
        .replace(/.md/, '.html'),
      rawPath: rawPath.replace(/.md/, '.html'),
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
  console.log('exec');
  const regex = /\[\[([^\|\]]+)(?:\|([^\]]+))?\]\]/g; // matches [[Link|Label]]
  const filesWithMetadata = getFileLocations(srcDir);

  return html.replace(regex, (match, link, label) => {
    const relativePath =
      filesWithMetadata.find((file) => file.title === link)?.relativePath ||
      `/404.html`;

    const linkText = label || link;
    const anchorTag = `<a href="${relativePath}">${linkText}</a>`;
    console.log(anchorTag);
    return anchorTag;
  });
};

export default resolveWikiLinks;
