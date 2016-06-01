import Request from 'superagent';
import Response from '../data/response';

function get (url, config, callback) {
  let req = Request.get(url);
  if (config.query) {
    req = req.query(config.query);
  }
  req.end(end(callback));
}

function post (url, config, callback) {
  let req = Request.post(url);
  if (config.data) {
    req = req.send(config.data);
  }
  req.end(end(callback));
}

function put (url, config, callback) {
  let req = Request.post(url);
  if (config.data) {
    req = req.send(config.data);
  }
  req.end(end(callback));
}

function destroy (url, config, callback) {
  let req = Request.del(url);
  if (config.data) {
    req = req.send(config.data);
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
