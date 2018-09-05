const pfs = require('fs-promise-native');
const fs = require('fs');
const yazl = require('yazl');
const { join, basename, dirname, resolve: absolute } = require('path');
const walk = require('walkdir');

const [ _nodeExe, _script, ...folderPaths ] = process.argv;


const find = (path) => new Promise((resolve, reject) => {
  const walker = walk(path);

  let rawFiles = [];

  walker.on('file', (name) => { rawFiles.push(name) });

  walker.on('end', () => { resolve({ rawFiles, path }) });

  walker.on('error', reject);

});


const clean = async ({ rawFiles, path }) => {

  const junk = (file) =>
    !file.toLowerCase().endsWith('mimetype') &&
    !basename(file).startsWith('.');

  const files = rawFiles.filter(junk);

  return { files, path }
}


const compress = ({ files, path }) => new Promise((resolve, reject) => {
  const container = dirname(absolute(path));
  const epubName = basename(path) + ".epub";
  const destinationFile = join(container, epubName);

  console.log(destinationFile);

  const zip = new yazl.ZipFile();
  const output = fs.createWriteStream(destinationFile);
  const mimetype = Buffer.from("application/epub+zip", "ascii");
  const mimetypemeta = { compress: false };

  zip.outputStream.pipe(output);
  zip.addBuffer(mimetype, "mimetype", mimetypemeta);

  output.on("close", () => {
    resolve("Completed: " + destinationFile);
  });

  files.forEach((file) => {
    zip.addFile(file, file.slice(absolute(path).length + 1));
  });

  zip.end();

});


folderPaths.forEach((path) => {
  find(path)
  .then(clean)
  .then(compress)
  .then(console.info)
  .catch(console.error)
});
