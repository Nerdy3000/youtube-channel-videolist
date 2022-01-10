'use strict'

const merge = require('webpack-merge');
const dotenv = require( 'dotenv' );

let envFileVars = Object.entries(dotenv.config().parsed).reduce((acc, curr) => ({...acc, [`${curr[0]}`]: JSON.stringify(curr[1]) }), {});

module.exports = merge( envFileVars, {
  NODE_ENV: '"production"'
});
