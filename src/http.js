import Request from 'request';

export default function (url) {

  const req = (res) => {
    return new Promise((resolve, reject) => {
      Request(url, function (error, response, body) {

        var contentType = response.headers['content-type'];
        if(contentType && contentType.indexOf('application/json') !== -1) {
            body = JSON.parse(body);
        }
        
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(body);
        }
      })
    })
  };

  return function (target, key, descriptor) {
    const fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new Error(`@http decorator can only be applied to methods not: ${typeof fn}`);
    }

    descriptor.value = () => fn(req, {});
    return descriptor;
  }
}

