Fitted
====

[![Build Status](https://travis-ci.org/JBlaak/Fitted.svg?branch=master)](https://travis-ci.org/JBlaak/Fitted)

Use ECMAScript decorators ([currently a Stage 2 proposal](https://github.com/tc39/proposals)) to
execute HTTP requests and manage processing of responses, an easy and readable way of managing
how data flows through the networking layer of your application.

Example
----

Two main parts, the method decorators which will actually do the request, and the class decorators
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

Usage
-----

__Basic request__

Using the `get` decorator you can trigger a `GET` request:

```javascript
import {get} from 'fitted';

class HackerNews {
    @get('https://hacker-news.firebaseio.com/v0/topstories.json')
    topstories (request, response) {
      return request({}, response);
    }
}
```

**Merging params**

To merge params with the url we use (url-template)[https://github.com/bramstein/url-template],
which uses curly brackets to encapsulate a to be merged variable.

```javascript
import {get} from 'fitted';

class HackerNews {
      @get('https://hacker-news.firebaseio.com/v0/item/{id}.json')
      item (id, request, response) {
          return request({
                template: {
                    id: 123
                 }
          }, response);
      }
}
```

**Base url**

Most of the time your endpoints will share the same base url, so Fitted
allows you to set a base url which will be prefixed to all paths 
set in your method decorators.

```javascript
import {base, get} from 'fitted';

@base('https://hacker-news.firebaseio.com/v0/')
class HackerNews {
      @get('item/{id}.json')
      item (id, request, response) {
          return request({
                template: {
                    id: 123
                 }
          }, response);
      }
}
```

__Sending data__

To add data to your request for `post`, `put` and `destroy` requests and
specifying a query string for your `get` request you add a `data` object
to your request definition.

```javascript
import {put} from 'fitted';

class HackerNews {
      @put('https://hacker-news.firebaseio.com/v0/item/{id}.json')
      item (id, name, request, response) {
          return request({
                template: {
                    id: 123
                },
                data: {
                   name: name
                }
          }, response);
      }
}
```

__Response handling__

When the server responds with a `Content-Type` header containing `application/json` 
Fitted will automatically feed it to the `JSON.parse` function so that
the resulting Promise will output the corresponding object.

Any other `Content-Type` will result in an Error being thrown and require 
you to implement your own handler.

**Custom response processor**

When your endpoint returns something that requires some pre-processing you
can define a processor for all endpoints in your api definition. This
consists of a function that receives the response from the server and
passes the parsed data to the response object.

```javascript
import {get, processor} from 'fitted';

const myProcessor = response => {
    const data = JSON.parse(response.getBody());
    response.setBody(data);
    
    return data;
}

@processor(myProcessor)
class HackerNews {
    @get('item/{id}.json')
    item (id, request, response) {
      return request({
            template: {
                id: id
            }
        }, response);
    }
}
```
