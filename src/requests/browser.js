/**
 * From: https://gist.github.com/monsur/706839
 * @param headerStr
 * @returns {{}}
 */
const parseResponseHeaders = (headerStr) => {
  const headers = {};
  if (!headerStr) {
    return headers;
  }
  var headerPairs = headerStr.split('\u000d\u000a');
  for (var i = 0; i < headerPairs.length; i++) {
    const headerPair = headerPairs[ i ];
    // Can't use split() here because it does the wrong thing
    // if the header value has the string ": " in it.
    const index = headerPair.indexOf('\u003a\u0020');
    if (index > 0) {
      const key = headerPair.substring(0, index).toLowerCase();
      headers[ key ] = headerPair.substring(index + 2);
    }
  }
  return headers;
};

export default function BrowserRequest (url, config, process) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState == 4) {
      if (request.status == 200) {
        const response = {
          headers: parseResponseHeaders(request.getAllResponseHeaders())
        };
        process(null, response, request.responseText);
      } else {
        process(new Error('Non 200 code returned from remote'), {}, request.responseText);
      }
    }
  };
  request.open('GET', url, true);
  request.send(null);
};

