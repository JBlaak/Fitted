import Decorator from "./decorator";

export function get(url) {
    return Decorator(url, 'GET');
}

export function post(url) {
    return Decorator(url, 'POST');
}

export function put(url) {
    return Decorator(url, 'PUT');
}

export function destroy(url) {
    return Decorator(url, 'DELETE');
}

export function base(p) {
    return (target) => {
        target.prototype._base = p;
    }
}

export function request(p) {
    return (target) => {
        target.prototype._request = p;
    }
}

export function processor(p) {
    return (target) => {
        target.prototype._processor = p;
    }
}
