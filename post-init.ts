import { $ } from "bun";
import { dirname, basename } from "path";
const { path } = import.meta;
const folderName = basename(dirname(path));

// delete the post-install script
await $`rm post-init.ts`;

// initialize husky
await $`bunx husky init`;

// get the username and email
const username = (await $`git config --global user.name`.quiet().then(e => e.text())).trim();
const email = (await $`git config --global user.email`.quiet().then(e => e.text())).trim();
const year = new Date().getFullYear();

// Create MIT license

const license = `MIT License

Copyright (c) ${year} ${username} <${email}>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

const readme = `# ${folderName}

This is a project! Or something...

## Installation

\`\`\`sh
bun install ${folderName}
\`\`\`

## Usage

## API

## CLI

## License

${license}
`;


// setup the git repository
await $`echo ${license} > LICENSE`;
await $`echo ${readme} > readme.md`;
await $`mkdir src`;
await $`echo "" > src/index.ts`;
// setup husky
await $`echo "bun test" > .husky/pre-commit`;
await $`echo "bunx prettier --write ." >> .husky/pre-commit`;

// push the git repo
await $`git add --all .`;
await $`git commit -m "Initial commit"`;

await $`git remote add origin https://github.com/${username.trim()}/${folderName}.git`;
await $`git push -u origin master`;
