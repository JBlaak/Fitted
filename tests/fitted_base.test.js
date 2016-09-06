import expect from "expect.js";
import Response from "../src/data/response";
import {get, base} from "../src/fitted";

describe('@base Decorator', function () {

    it('should prepend a base url to the given url', async function () {
        /* Given */
        let passedUrl = null;
        const driver = (url, config, callback) => {
            passedUrl = url;

            const res = new Response();
            res.setStatus(200);

            callback(res);
        };

        @base('https://your-backend.com/')
        class MyBackendService {

            @get('topstories.json')
            topstories(request, response) {
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
        const topstories = await myBackendService.topstories();

        /* Then */
        expect(passedUrl).to.be('https://your-backend.com/topstories.json');
    });

});

