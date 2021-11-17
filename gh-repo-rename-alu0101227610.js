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
  .option('-o, --org <org>', 'org')
  .option('-n, --name <name>', 'name');

program.parse(process.argv);

let args = program.args;

let originalName = `${program.opts().name}`;
let { org, repo, name } = program.opts();

if (repo) console.log(`repository: ${repo}`);
if (org) console.log(`owner: ${org}`);

if (!org || !repo || !name) program.help();

if (!shell.which('git')) shell.echo("git not installed")
if (!shell.which('gh')) shell.echo("gh not installed");

//if(program.args.length < 1) program.help();

let r = shell.exec(`gh api -X PATCH /repos/${org}/${repo} -f name=${name}`), {silent: true};
r = JSON.parse(r.stdout)
console.log(`The repo has been renamed to ${r.full_name}`);
// --jq .[].name