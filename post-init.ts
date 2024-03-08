import { $ } from "bun";
import { dirname } from "path";
const { path } = import.meta;
const folderName = dirname(path);

// delete the post-install script
await $`rm post-init.ts`;

// initialize husky
await $`bunx husky init`;

// setup the git repository
await $`git add --all .`;
await $`git commit -m "Initial commit"`;
const username = await $`git config --global user.name`.then(e => e.text());
await $`git remote add origin https://github.com/${username.trim()}/${folderName}.git`;
await $`git push -u origin master`;
