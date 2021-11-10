#! /Users/fuego/.nvm/versions/node/v17.0.1/bin/node

const ins = require("util").inspect;
const deb = (...args) => { 
    if (debug) console.log(ins(...args, {depth: null})); 
};

const fs = require("fs");
const shell = require('shelljs');
const { Command } = require('commander');
const program = new Command();
const { version } = require("./package.json")
const { args } = program;

program
  .version(version)
  .option('-r, --repo <repo>', 'repository')
  .option('-o, --org <org>', 'org');

program.parse(process.argv);

const {org, repo} = program.opts();

const options = program.opts();
  if (repo) console.log(`repository: ${repo}`);
  if (org) console.log(`org: ${org}`);

if (!shell.which('git')) shell.echo("git not installed")
if (!shell.which('gh')) shell.echo("gh not installed");

if (!(org && repo && args.length === 1)) program.help();    
else if (args.length < 2) program.help();