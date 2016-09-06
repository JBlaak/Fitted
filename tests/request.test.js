import expect from "expect.js";
import request from "../src/request";
import Response from "../src/data/response";

describe('Request', function () {

    it('should pass the expanded url to the driver', async function () {
        /* Given */
        let calledUrl = null;

        const driver = (url, config, callback) => {
            calledUrl = url;
            const res = new Response();
            res.setStatus(200);
            res.setBody([
                123,
                321
            ]);
            callback(res);
        };

        /* When */
        const config = {
            driver: driver,
            template: {
                id: 123
            }
        };

        await request('/item/{id}', config, {});

        /* Then */
        expect(calledUrl).to.be('/item/123');
    });

    it('should use the provided processor', async function () {
        /* Given */
        const driver = (url, config, callback) => {
            const res = new Response();
            res.setStatus(200);
            res.setBody([
                123,
                321
            ]);
            callback(res);
        };

        let calledMyProcessor = false;
        const processor = (response) => {
            calledMyProcessor = true;
            return response;
        };

        /* When */
        const config = {
            driver: driver,
            template: {
                id: 123
            }
        };
        const response = {
            processor: processor
        };

        await request('/item/{id}', config, response);

        /* Then */
        expect(calledMyProcessor).to.be(true);
    })
});