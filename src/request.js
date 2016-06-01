import UrlTemplate from 'url-template';
import HttpFactory from './http';
import ProcessorFactory from './processor_factory';

export default function request (url, config, res) {
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
}

