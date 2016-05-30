export default function ServerRequest (url, config, process) {
  var Request = require('request');
  Request(url, process);
};

