import UrlTemplate from 'url-template';
import driver from './driver';
import processorFactory from './processor_factory';

export default function request(url, config, res) {
    return new Promise((resolve, reject) => {
        if (res.base) {
            url = res.base + url;
        }

        const expandedUrl = UrlTemplate.parse(url).expand(config.template || {});

        driver(expandedUrl, config, response => {
            if (typeof res.processor !== 'function') {
                res.processor = processorFactory(response);
            }

            response = res.processor(response);

            if (response.isOk()) {
                resolve(response.getBody());
            } else {
                reject(response);
            }
        });
    });
}

