Fitted
====

[![Build Status](https://travis-ci.org/JBlaak/Fitted.svg?branch=master)](https://travis-ci.org/JBlaak/Fitted)

Use ES7 decorators to do HTTP request and manage processing of responses, an easy and readable way of managing
how data flows through the networking layer of your application

Example
----

TL;DR just show me code, well try and run `npm install && npm run-script hackernews` in the `example` dir

Two main parts, the function decorators which will actually do the request, and the class decorators
which will allow you to handle the way responses from the server are transformed and handled.

```javascript
import {get, processor} from 'fitted';

const myProcessor = response => {
    const data = JSON.parse(response.getBody());
    response.setBody(data);
    
    return data;
}

@processor(myProcessor)
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
```

And fetch:

```
const hackerNews = new HackerNews();
const topstories = await hackerNews.topstories();
const item = await hackerNews.item(9786706);
console.log(item);
```

