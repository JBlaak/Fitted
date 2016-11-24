Fitted
====

[![Build Status](https://travis-ci.org/JBlaak/Fitted.svg?branch=master)](https://travis-ci.org/JBlaak/Fitted)

Use ES7 decorators to execute HTTP requests and manage processing of responses, an easy and readable way of managing
how data flows through the networking layer of your application.

Example
----

Two main parts, the function decorators which will actually do the request, and the class decorators
which will allow you to handle the way responses from the server are transformed and handled.

The simplest example is just a fetch of data from a JSON endpoint:

```javascript
import {get} from 'fitted';

class HackerNews {
    @get('https://hacker-news.firebaseio.com/v0/topstories.json')
    topstories (request, response) {
      return request({}, response);
    }
}
```

And fetch:

```javascript
const hackerNews = new HackerNews();
const topstories = await hackerNews.topstories();
console.log(topstories);
```

However you can tweak behavior to your wishes and introduce POST, PUT and other requests

```javascript
import {get, post, processor, base} from 'fitted';

//This will be resolved from the application/json response body
const myProcessor = response => {
    const data = JSON.parse(response.getBody());
    response.setBody(data);
    
    return data;
}

@base('https://hacker-news.firebaseio.com/v0/')
@processor(myProcessor)
class HackerNews {
    @get('item/{id}.json')
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
    
    @post('items')
    store (title, request, response) {
      return request(
        {
            data: {
                title: title
            }
        },
        response
      );
    }
}
```

And fetch:

```javascript
const hackerNews = new HackerNews();
const item = await hackerNews.item(9786706);
const result = await hackerNews.store('Fitted is awesome!');
console.log(item);
```

