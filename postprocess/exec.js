#!/usr/bin/env node
const vorpal = require('vorpal')();
const cmds = require('.');
cmds.run(vorpal);