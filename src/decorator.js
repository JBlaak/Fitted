import request from './request';

export default function decorator(url, method) {
    return (target, property, descriptor) => {
        const fn = descriptor.value;
        if (typeof fn !== 'function') {
            throw new Error(`@(get|put|post|destroy) decorator can only be applied to methods not: ${typeof fn}`);
        }

        descriptor.value = function (...args) {
            /*
             * The function that will is called from within the decorated method, e.g.:
             *
             * @get('/bar')
             * foo(req, res) {
             *      return req({}, res);
             * }
             */
            const req = (config, res) => {
                config.method = method;

                if (target._request) {
                    config = target._request(config);
                }

                return request(url, config, res);
            };
            /*
             * The config of the response processing
             */
            const res = {
                base: target._base,
                processor: target._processor
            };

            return fn.apply(this, [...args, req, res]);
        };

        return descriptor;
    };
}
