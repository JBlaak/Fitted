import expect from 'expect.js';
import http from '../src/http';

describe('HttpDecorator', function () {

  describe('@http', function () {

    it('should be able to fetch topstories from HackerNews', async function () {
      /* Given */
      class HackerNews {

        @http('https://hacker-news.firebaseio.com/v0/topstories.json')
        static topstories (request, response) {
          return request(response);
        }

      }

      /* When */
      const topstories = await HackerNews.topstories();

      /* Then */
      expect(topstories).to.be.an(Array);
      expect(topstories.length).to.be.greaterThan(0);
    });

  });

});