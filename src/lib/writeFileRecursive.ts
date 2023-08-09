const fs = require('fs');
const getDirName = require('path').dirname;

function defaultCallback(err: Error) {
  if (err) throw err;
}

/**
 * Recursively creates a file. Creates directories that do not exist in the file's path.
 */
function writeFileRecursive(
  path: any,
  contents: any,
  cb: any = defaultCallback
) {
  fs.mkdir(getDirName(path), { recursive: true }, function (err: Error) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

export default writeFileRecursive;
