#! /Users/fuego/.nvm/versions/node/v17.0.1/bin/node
const ins = require("util").inspect;
const deb = (...args) => { 
    if (debug) console.log(ins(...args, {depth: null})); 
};

const fs = require("fs");
const shell = require('shelljs');
const { Command } = require('commander');
const program = new Command();

program.version('8.3.0')

program
  .option('-r, --repo <repo>', 'repository')
  .option('-o, --org <org>', 'org');

program.parse(process.argv);

  const options = program.opts();
  if (options.repo) console.log(`repository: ${options.repo}`);
  if (options.org) console.log(`org: ${options.org}`);

if (!shell.which(git)) shell.echo("git not installed")
if (!shell.which(gh)) shell.echo("gh not installed");


const org = options.org;
if (!org) {
    if(program.args.length < 2) {
        console.log("No arguments specified. sending help")
        program.help();
    }
}