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

let { org, repo, name } = program.opts();

if (repo) console.log(`repository: ${repo}`);
if (org) console.log(`owner: ${org}`);

if (!shell.which('git')) shell.echo("git not installed")
if (!shell.which('gh')) shell.echo("gh not installed");

if(program.args.length < 1) program.help();

let newName;

if (!newName) newName = args[0]
if (!org || !repo || !newName) program.help()

if (!org) {
  [org, repo] = args[0].split("/");
  console.log(`owner: ${org} repository: ${repo}`)

  newName = args[1]
  shell.exec(`gh api -X PATCH /repos/${org}/${repo} -f name=${name} --jq .[].name`);
}

