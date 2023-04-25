'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://43.205.203.63/api/company/1',
  connections: 1000, //default
  pipelining: 1, // default
  duration: 15, // default
  
}, console.log)
//console.log(Date.now())