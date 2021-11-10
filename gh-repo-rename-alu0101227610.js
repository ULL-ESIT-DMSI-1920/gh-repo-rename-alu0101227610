#! /usr/bin/env node
const ins = require("util").inspect;
const deb = (...args) => {
  if (debug) console.log(ins(...args, { depth: null }));
};

const fs = require("fs");
const shell = require('shelljs');
const { Command } = require('commander');
const program = new Command();
const { version } = require("./package.json")

program
  .version(version)
  .option('-r, --repo <repo>', 'repository')
  .option('-o, --org <org>', 'org');

program.parse(process.argv);

let args = program.args;

let { org, repo } = program.opts();
console.log(`org y repo ${org} ${repo}`)


if (repo) console.log(`repository: ${repo}`);
if (org) console.log(`org: ${org}`);

if (!shell.which('git')) shell.echo("git not installed")
if (!shell.which('gh')) shell.echo("gh not installed");

let newName;
if (!org) {
  [org, repo] = args[0].split("/");
  console.log(`org y repo ${org} ${repo}`)

  newName = args[1]
  console.log(`newName = ${newName}`)
}
if (!newName) newName = args[0]

if (!org || !repo || !newName) program.help()