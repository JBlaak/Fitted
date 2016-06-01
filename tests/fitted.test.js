import 'babel-polyfill';
import expect from 'expect.js';
import Response from '../src/data/response';
import {get, processor} from '../src/fitted';

describe('@processor Decorator', function () {

  it('Should have its processor called by function decorator', async function () {
    /* Given */
    let processorWasCalled = false;
    const myProcessor = (response) => {
      processorWasCalled = true;

      return response;
    };

    @processor(myProcessor)
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
    await hackerNews.topstories();

    /* Then */
    expect(processorWasCalled).to.be(true);
  });

});

describe('@get Decorator', function () {

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
