import Decorator from './decorator';
import Request from './request';

export function get (url) {
  const req = (config, res) => {
    config.method = 'GET';
    return Request(url, config, res)
  };

  return Decorator(req);
}

export function processor (p) {
  return (target) => {
    target.prototype._processor = p;
  }
}
