#Ebook Zip

A simple, cross-platform zipper for epub folders.

From source, just run `npm install && npm run build`. This will create an executable named `ebook-zip` suitable for your system. You can copy the standalone executable anywhere you like, to any compatible computer, and simply drag-and-drop unzipped ebook folders onto it to automatically convert them to .epub files. It can zip individual folders, or it can process a whole list at once.

Alternatively, you may use the script from the command line with NodeJS installed, as follows: `node index.js <folder_location>...`

Files whose names start with a dot will not be included in the output.

Testing is done via `npm test`, which runs the program against a valid, included ebook folder, and then checks the resulting .epub file with epubcheck 4.0.2. If the program both runs and validates successfully, you should see the output, `Valid output.`.

If there are features or options you'd like to see added to this zipper, feel free to raise an issue or contact me directly.
