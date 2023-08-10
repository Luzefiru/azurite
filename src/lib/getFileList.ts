import fs from 'fs';

/**
 * Gets the list of files from the {srcDir}, excluding directory/folder entries.
 */
function getFileList(dirName: string): string[] {
  let files: string[] = [];

  const dirEnts = fs.readdirSync(dirName, {
    withFileTypes: true,
  });

  for (const item of dirEnts) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }
  return files;
}

export default getFileList;
