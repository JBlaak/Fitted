import Superagent from 'superagent';
import Response from '../data/response';

export default (url, config, callback) => {
    /* Allow injecting the Superagent lib */
    if (!config._superagent) {
        config._superagent = Superagent;
    }

    switch (config.method) {
        case 'GET':
            get(url, config, callback);
            break;
        case 'POST':
            post(url, config, callback);
            break;
        case 'PUT':
            put(url, config, callback);
            break;
        case 'DELETE':
            destroy(url, config, callback);
            break;
        default:
            throw new Error('Unknown HTTP verb requested', config.method);
    }
};

function get(url, config, callback) {
    let req = config._superagent.get(url);
    if (config.query) {
        req = req.query(config.query);
    }
    if (config.headers) {
        req = passHeaders(config.headers, req);
    }
    req.end(end(callback));
}

function post(url, config, callback) {
    let req = config._superagent.post(url);
    if (config.data) {
        req = req.send(config.data);
    }
    if (config.headers) {
        req = passHeaders(config.headers, req);
    }
    req.end(end(callback));
}

function put(url, config, callback) {
    let req = config._superagent.post(url);
    if (config.data) {
        req = req.send(config.data);
    }
    if (config.headers) {
        req = passHeaders(config.headers, req);
    }
    req.end(end(callback));
}

function destroy(url, config, callback) {
    let req = config._superagent.del(url);
    if (config.data) {
        req = req.send(config.data);
    }
    if (config.headers) {
        req = passHeaders(config.headers, req);
    }
    req.end(end(callback));
}

function passHeaders(headers, req) {
    for (const header in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, header)) {
            req = req.set(header, headers[header]);
        }
    }
    return req;
}

function end(callback) {
    return (err, res) => {
        const response = new Response();

        if (err) {
            response.setError(err);
        } else {
            response.setBody(res.body);
            response.setHeaders(res.header);
            response.setStatus(res.status);
        }

        callback(response);
    };
}

