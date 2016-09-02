import Superagent from "superagent";
import Response from "../data/response";

function get(url, config, callback) {
    let req = Superagent.get(url);
    if (config.query) {
        req = req.query(config.query);
    }
    if (config.headers) {
        req = passHeaders(config.headers, req);
    }
    req.end(end(callback));
}

function post(url, config, callback) {
    let req = Superagent.post(url);
    if (config.data) {
        req = req.send(config.data);
    }
    if (config.headers) {
        req = passHeaders(config.headers, req);
    }
    req.end(end(callback));
}

function put(url, config, callback) {
    let req = Superagent.post(url);
    if (config.data) {
        req = req.send(config.data);
    }
    if (config.headers) {
        req = passHeaders(config.headers, req);
    }
    req.end(end(callback));
}

function destroy(url, config, callback) {
    let req = Superagent.del(url);
    if (config.data) {
        req = req.send(config.data);
    }
    if (config.headers) {
        req = passHeaders(config.headers, req);
    }
    req.end(end(callback));
}

export default (url, config, callback) => {
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
    }
}

const passHeaders = (headers, req) => {
    for (const header in headers) {
        req = req.set(header, headers[header]);
    }
    return req;
};

const end = (callback) => {
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
    }
};
