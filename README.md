Fitted
====

[![Build Status](https://travis-ci.org/JBlaak/Fitted.svg?branch=master)](https://travis-ci.org/JBlaak/Fitted)

ES7 decorator to do http request, currently in experimental fase! But look how awesome this is:

```javascript
import {get} from 'fitted';

class HackerNews {

    @get('https://hacker-news.firebaseio.com/v0/topstories.json')
    topstories (request, response) {
      return request({}, response);
    }
    
    @get('https://hacker-news.firebaseio.com/v0/item/{id}.json')
    item (id, request, response) {
      return request(
        {
          id: id
        },
        response
      );
    }
}
```

And fetch:

```
const hackerNews = new HackerNews();
const topstories = await hackerNews.topstories();
const item = await hackerNews.item(9786706);
```

