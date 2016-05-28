import expect from 'expect.js';
import {get} from '../src/http';

describe('HttpDecorator', function () {

  describe('@http', function () {

    it('should be able to fetch topstories from HackerNews', async function () {
      /* Given */
      class HackerNews {

        @get('https://hacker-news.firebaseio.com/v0/topstories.json')
        topstories (request, response) {
          return request(response);
        }

      }

      /* When */
      var hackerNews = new HackerNews();
      const topstories = await hackerNews.topstories();

      /* Then */
      expect(topstories).to.be.an(Array);
      expect(topstories.length).to.be.greaterThan(0);
    });

  });

});