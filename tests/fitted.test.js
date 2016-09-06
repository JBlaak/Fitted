import expect from "expect.js";
import Response from "../src/data/response";
import {get} from "../src/fitted";

describe('Fitted', function () {

    it('should maintain closure of methods', async function () {
        /* Given */
        const driver = (url, config, callback) => {
            const res = new Response();
            res.setStatus(200);

            callback(res);
        };

        /* When */
        let result = null;
        class Foo {
            constructor() {
                this.bar = 'asdf';
            }

            @get('/')
            myMethod(request, response) {
                result = this.bar;
                return request(
                    {
                        driver: driver
                    },
                    response
                );
            }
        }

        const foo = new Foo();
        await foo.myMethod();

        /* Then */
        expect(result).to.be('asdf');
    });
});
