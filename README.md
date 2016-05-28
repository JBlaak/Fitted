Fitter
====

ES7 decorator to do http request, currently in experimental fase! But look how awesome this is:

```
class HackerNews {

    @http('https://hacker-news.firebaseio.com/v0/topstories.json')
    static topstories (request, response) {
      return request(response);
    }

}
```

And fetch:

```
const topstories = await HackerNews.topstories();
```

