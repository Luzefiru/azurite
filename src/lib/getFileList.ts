import fs from 'node:fs/promises';

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

export default getFileList;
