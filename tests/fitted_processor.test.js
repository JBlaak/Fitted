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
    class MyBackendService {

      @get('https://your-backend.com/topstories.json')
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
    var myBackendService = new MyBackendService();
    await myBackendService.topstories();

    /* Then */
    expect(processorWasCalled).to.be(true);
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
