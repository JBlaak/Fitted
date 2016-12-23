import expect from "expect.js";
import Response from "../src/data/response";
import {get, post, put, destroy} from "../src/fitted";

describe('@get decorator', function () {

    it('should pass a GET method to the driver in the config', async function () {
        /* Given */
        let passedMethod = null;
        const driver = (url, config, callback) => {
            passedMethod = config.method;
            const res = new Response();
            res.setStatus(200);
            res.setBody([
                123,
                321
            ]);
            callback(res);
        };

        class MyBackendService {

            @get('https://your-backend.com/topstories.json')
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
        expect(passedMethod).to.be('GET');
    });

    it('should be able to fetch topstories from MyBackendService', async function () {
        /* Given */
        class MyBackendService {

            @get('https://your-backend.com/topstories.json')
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
        expect(topstories).to.be.an(Array);
        expect(topstories.length).to.be.greaterThan(0);
    });

    it('should be able to fetch a single item from MyBackendService', async function () {
        /* Given */
        class MyBackendService {

            @get('https://your-backend.com/item/{id}.json')
            item(id, request, response) {

                return request(
                    {
                        driver: driver,
                        template: {
                            id: id
                        }
                    },
                    response
                );
            }

        }

        /* When */
        var myBackendService = new MyBackendService();
        const topstories = await myBackendService.item(123123);

        /* Then */
        expect(topstories).to.be.an(Array);
        expect(topstories.length).to.be.greaterThan(0);
    });

});

describe('@post decorator', function () {

    it('should pass a POST method to the driver in the config', async function () {
        /* Given */
        let passedMethod = null;
        const driver = (url, config, callback) => {
            passedMethod = config.method;
            const res = new Response();
            res.setStatus(200);
            res.setBody([
                123,
                321
            ]);
            callback(res);
        };

        class MyBackendService {

            @post('https://your-backend.com/topstories.json')
            create(content, request, response) {

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
        const topstories = await myBackendService.create('My story');

        /* Then */
        expect(passedMethod).to.be('POST');
    });

});

describe('@put decorator', function () {

    it('should pass a PUT method to the driver in the config', async function () {
        /* Given */
        let passedMethod = null;
        const driver = (url, config, callback) => {
            passedMethod = config.method;
            const res = new Response();
            res.setStatus(200);
            res.setBody([
                123,
                321
            ]);
            callback(res);
        };

        class MyBackendService {

            @put('https://your-backend.com/topstories.json')
            update(content, request, response) {

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
        const topstories = await myBackendService.update('My better story');

        /* Then */
        expect(passedMethod).to.be('PUT');
    });

});

describe('@destroy decorator', function () {

    it('should pass a DELETE method to the driver in the config', async function () {
        /* Given */
        let passedMethod = null;
        const driver = (url, config, callback) => {
            passedMethod = config.method;
            const res = new Response();
            res.setStatus(200);
            res.setBody([
                123,
                321
            ]);
            callback(res);
        };

        class MyBackendService {

            @destroy('https://your-backend.com/topstories.json')
            destroy(id, request, response) {

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
        const topstories = await myBackendService.destroy(123123);

        /* Then */
        expect(passedMethod).to.be('DELETE');
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
