#!/usr/local/bin/node

'use strict';
const formater = require('commander');
const Command = require('./src/command');

const command = new Command();

formater
  .version('1.0.0')
  .usage('<command>');

formater
  .command('show')
  .description( 'show the last updateed files')
  .action(function () {
    command.show();
  });

formater
  .command('add [all]')
  .description('add file to the commit')
  .action(function (options) {
    command.add(!!(options));
  });

formater
  .command('commit')
  .description('commit files')
  .action(function () {
    command.commit();
  });

formater
  .command('push')
  .description('push files')
  .action(function () {
    command.push();
  });

formater
  .command('send [all]')
  .description('add commit and push files')
  .action(function (options) {
    command.send(!!(options));
  });

formater.parse(process.argv);
