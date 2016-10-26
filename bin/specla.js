#!/usr/bin/env node

'use strict';

const Specla = require('specla');
const SuperCLI = require('super-cli');
const CommandLoader = require('./libs/CommandLoader');

global.packageInfo = require('../package.json');

const cli = new SuperCLI({
  name: 'Specla'
});

new CommandLoader(cli);


cli.on('missing', () => {
  if(cli.has(['-v', '--version'])){
    return cli.trigger('version');
  }

  cli.trigger('help');
});

cli.start();
