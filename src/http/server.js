export default function ServerRequest (url, config, callback) {
  const Request = require('request');
  Request(url, (error, response, body) => {
    var Response = require('../data/response').default;
    const result = new Response();
    result.setStatus(response.statusCode);
    result.setHeaders(response.headers);
    result.setBody(body);
    callback(result);
  });
};

