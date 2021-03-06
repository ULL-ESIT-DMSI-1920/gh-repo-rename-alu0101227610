#! /usr/bin/env node
const ins = require("util").inspect;

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
// console.log(originalName);

if (!shell.which('git')) shell.echo("git not installed")
if (!shell.which('gh')) shell.echo("gh not installed");

if (!org || ! repo || !name) program.help();
if (!org || !repo || !name) program.help();

let r = shell.exec(`gh api -X PATCH /repos/${org}/${repo} -f name=${name}`, {silent: true});

let rj = JSON.parse(r.stdout)
console.log(`The repo has been renamed to ${rj.full_name}`);
