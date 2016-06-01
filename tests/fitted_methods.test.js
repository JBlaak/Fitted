import expect from 'expect.js';
import Response from '../src/data/response';
import {get, post, put, destroy, processor} from '../src/fitted';

describe('@get Decorator', function () {

  it('should pass a GET method to the driver in the config', async function () {
    /* Given */
    let passedMethod = null;
    const driver = (url, config, callback) => {
      passedMethod = config.method;
      const res = new Response();
      res.setStatus(200);
      res.setBody([
        123,
        321
      ]);
      callback(res);
    };

    class HackerNews {

      @get('https://hacker-news.firebaseio.com/v0/topstories.json')
      topstories (request, response) {

        return request(
          {
            driver: driver
          },
          response
        );
      }

    }

    /* When */
    var hackerNews = new HackerNews();
    const topstories = await hackerNews.topstories();

    /* Then */
    expect(passedMethod).to.be('GET');
  });

  it('should be able to fetch topstories from HackerNews', async function () {
    /* Given */
    class HackerNews {

      @get('https://hacker-news.firebaseio.com/v0/topstories.json')
      topstories (request, response) {

        return request(
          {
            driver: driver
          },
          response
        );
      }

    }

    /* When */
    var hackerNews = new HackerNews();
    const topstories = await hackerNews.topstories();

    /* Then */
    expect(topstories.getBody()).to.be.an(Array);
    expect(topstories.getBody().length).to.be.greaterThan(0);
  });

  it('should be able to fetch a single item from HackerNews', async function () {
    /* Given */
    class HackerNews {

      @get('https://hacker-news.firebaseio.com/v0/item/{id}.json')
      item (id, request, response) {

        return request(
          {
            driver: driver,
            template: {
              id: id
            }
          },
          response
        );
      }

    }

    /* When */
    var hackerNews = new HackerNews();
    const topstories = await hackerNews.item(123123);

    /* Then */
    expect(topstories.getBody()).to.be.an(Array);
    expect(topstories.getBody().length).to.be.greaterThan(0);
  });

});

describe('@post Decorator', function () {

  it('should pass a POST method to the driver in the config', async function () {
    /* Given */
    let passedMethod = null;
    const driver = (url, config, callback) => {
      passedMethod = config.method;
      const res = new Response();
      res.setStatus(200);
      res.setBody([
        123,
        321
      ]);
      callback(res);
    };

    class HackerNews {

      @post('https://hacker-news.firebaseio.com/v0/topstories.json')
      create (content, request, response) {

        return request(
          {
            driver: driver
          },
          response
        );
      }

    }

    /* When */
    var hackerNews = new HackerNews();
    const topstories = await hackerNews.create('My story');

    /* Then */
    expect(passedMethod).to.be('POST');
  });

});

describe('@put Decorator', function () {

  it('should pass a PUT method to the driver in the config', async function () {
    /* Given */
    let passedMethod = null;
    const driver = (url, config, callback) => {
      passedMethod = config.method;
      const res = new Response();
      res.setStatus(200);
      res.setBody([
        123,
        321
      ]);
      callback(res);
    };

    class HackerNews {

      @put('https://hacker-news.firebaseio.com/v0/topstories.json')
      update (content, request, response) {

        return request(
          {
            driver: driver
          },
          response
        );
      }

    }

    /* When */
    var hackerNews = new HackerNews();
    const topstories = await hackerNews.update('My better story');

    /* Then */
    expect(passedMethod).to.be('PUT');
  });

});

describe('@destroy Decorator', function () {

  it('should pass a DELETE method to the driver in the config', async function () {
    /* Given */
    let passedMethod = null;
    const driver = (url, config, callback) => {
      passedMethod = config.method;
      const res = new Response();
      res.setStatus(200);
      res.setBody([
        123,
        321
      ]);
      callback(res);
    };

    class HackerNews {

      @destroy('https://hacker-news.firebaseio.com/v0/topstories.json')
      destroy (id, request, response) {

        return request(
          {
            driver: driver
          },
          response
        );
      }

    }

    /* When */
    var hackerNews = new HackerNews();
    const topstories = await hackerNews.destroy(123123);

    /* Then */
    expect(passedMethod).to.be('DELETE');
  });

});

const driver = (url, config, callback) => {
  const res = new Response();
  res.setStatus(200);
  res.setBody([
    123,
    321
  ]);
  callback(res);
};
