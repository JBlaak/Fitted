import superagent from './drivers/superagent';

export default (url, config, callback) => {
    if (typeof config.driver === 'function') {
        config.driver(url, config, callback);
    } else {
        superagent(url, config, callback);
    }
};
