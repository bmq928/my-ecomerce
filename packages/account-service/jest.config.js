const env = process.env['NODE_ENV']

if (env === 'ci') module.exports = require('./jest.ci.config')
else module.exports = require('./jest.dev.config')
