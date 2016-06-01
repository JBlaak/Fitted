import {get, processor} from '../src/fitted';

class HackerNews {

  @get('https://hacker-news.firebaseio.com/v0/topstories.json')
  topstories (request, response) {
    return request({}, response);
  }

  @get('https://hacker-news.firebaseio.com/v0/item/{id}.json')
  item (id, request, response) {
    return request(
      {
        template: {
          id: id
        }
      },
      response
    );
  }
}

(async function () {
  const hackerNews = new HackerNews();
  const topstories = await hackerNews.topstories();
  
  console.log(`There are ${topstories.length} topstories!`);
  
  const item = await hackerNews.item(9786706);
  
  console.log(`And article 9786706 is by ${item.by}.`);
  
})();
