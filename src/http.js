import UrlTemplate from 'url-template';
import Request from 'request';

export function get (url) {

  const req = (config, res) => {

    return new Promise((resolve, reject) => {
      Request(UrlTemplate.parse(url).expand(config.template || {}), function (error, response, body) {

        if (typeof res.processor != 'function') {
          res.processor = processor(error, response, body);
        }

        const result = res.processor(error, response, body);

        if (!result.error && result.response.statusCode == 200) {
          resolve(result.body);
        } else {
          reject(result.body);
        }
      })
    })
  };

  return function (target, key, descriptor) {
    const fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new Error(`@http decorator can only be applied to methods not: ${typeof fn}`);
    }

    descriptor.value = (...args) => fn.apply(fn, [ ...args, req, {} ]);
    return descriptor;
  }
}

/**
 * Get the appropriate processor for the response
 * @param error
 * @param response
 * @param body
 * @returns {function(error, response, body)}
 */
const processor = (error, response, body) => {

  var contentType = response.headers[ 'content-type' ];
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return () => {
      return {
        error: error,
        response: response,
        body: JSON.parse(body)
      }
    }
  }

};
