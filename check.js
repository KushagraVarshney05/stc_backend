'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:5000/api/companySearch/5/2022',
  connections: 1000, //default
  pipelining: 1, // default
  duration: 15, // default
  
}, console.log)
//console.log(Date.now())