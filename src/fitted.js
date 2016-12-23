import decorator from './decorator';

export function get(url) {
    return decorator(url, 'GET');
}

export function post(url) {
    return decorator(url, 'POST');
}

export function put(url) {
    return decorator(url, 'PUT');
}

export function destroy(url) {
    return decorator(url, 'DELETE');
}

export function base(p) {
    return target => {
        target.prototype._base = p;
    };
}

export function request(p) {
    return target => {
        target.prototype._request = p;
    };
}

export function processor(p) {
    return target => {
        target.prototype._processor = p;
    };
}
