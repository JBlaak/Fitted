import Request from 'superagent';
import Response from './data/response';

export default (url, config, callback) => {

  Request
    .get(url)
    .end((err, res) => {
      const response = new Response();

      if (err) {
        response.setError(err);
      } else {
        response.setBody(res.body);
        response.setHeaders(res.header);
        response.setStatus(res.status);
      }

      callback(response);
    });
}

