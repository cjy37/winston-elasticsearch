/**
 Transformer function to transform log data as provided by winston into
 a message structure which is more appropriate for indexing in ES.

 @param {Object} logData
 @param {Object} logData.message - the log message
 @param {Object} logData.level - the log level
 @param {Object} logData.meta - the log meta data
 @returns {Object} transformed message
 */
const hostname = require("os").hostname();
const transformer = function transformer(logData) {

  const transformed = {};
  transformed['@timestamp'] = logData.timestamp ? logData.timestamp : new Date().toISOString();
  transformed.host = hostname;
  transformed.message = logData.message;
  transformed.severity = logData.level;
  transformed.process = logData.process;
  transformed.logtype = logData.logtype;
  transformed.fields = logData.meta;
  return transformed;
};

module.exports = transformer;
