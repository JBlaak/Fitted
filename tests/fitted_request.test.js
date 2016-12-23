import expect from "expect.js";
import Response from "../src/data/response";
import {get, request} from "../src/fitted";

describe('@request decorator', function () {

    it('Should have its method called with passed config', async function () {
        /* Given */
        let passedConfig = null;
        const myRequestDecorator = (config) => {
            passedConfig = config;

            return config;
        };

        @request(myRequestDecorator)
        class MyBackendService {

            @get('https://your-backend.com/topstories.json')
            topstories(request, response) {
                return request(
                    {
                        driver: driver,
                        foo: 'bar'
                    },
                    response
                );
            }

        }

        /* When */
        var myBackendService = new MyBackendService();
        await myBackendService.topstories();

        /* Then */
        expect(passedConfig.foo).to.be('bar');
    });

    it('should pass the resultant request config to the driver', async function () {
        /* Given */
        let passedConfig = null;
        const myRequestDecorator = (config) => {
            config.foo = 'boo';
            
            return config;
        };

        const myDriver = (url, config, callback) => {
            passedConfig = config;
            
            const res = new Response();
            res.setStatus(200);
            res.setBody([
                123,
                321
            ]);
            callback(res);
        };

        @request(myRequestDecorator)
        class MyBackendService {

            @get('https://your-backend.com/topstories.json')
            topstories(request, response) {
                return request(
                    {
                        driver: myDriver,
                        foo: 'bar'
                    },
                    response
                );
            }

        }

        /* When */
        var myBackendService = new MyBackendService();
        await myBackendService.topstories();

        /* Then */
        expect(passedConfig.foo).to.be('boo');
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
