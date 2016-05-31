import UrlTemplate from 'url-template';
import HttpFactory from './http_factory';
import ProcessorFactory from './processor_factory';

export function get (url) {
  const req = (config, res) => {
    return new Promise((resolve, reject) => {
      const expandedUrl = UrlTemplate.parse(url).expand(config.template || {});
      HttpFactory(expandedUrl, config, (response) => {

        if (typeof res.processor != 'function') {
          res.processor = ProcessorFactory(response);
        }
        response = res.processor(response);

        if (response.isOk()) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    })
  };

  return (target, key, descriptor) => {
    const fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new Error(`@(get|put|post|delete) decorator can only be applied to methods not: ${typeof fn}`);
    }

    descriptor.value = (...args) => fn.apply(fn, [ ...args, req, {} ]);
    return descriptor;
  }
}

