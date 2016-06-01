import Decorator from './decorator';
import Request from './request';

export function get (url) {
  return impl(url, 'GET');
}

export function post (url) {
  return impl(url, 'POST');
}

export function put (url) {
  return impl(url, 'PUT');
}

export function destroy (url) {
  return impl(url, 'DELETE');
}

export function processor (p) {
  return (target) => {
    target.prototype._processor = p;
  }
}

function impl (url, method) {
  const req = (config, res) => {
    config.method = method;
    return Request(url, config, res)
  };

  return Decorator(req);
}
