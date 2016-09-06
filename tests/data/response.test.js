import expect from "expect.js";
import Response from "../../src/data/response";

describe('Response', function () {

    describe('isOk', function () {
        it('should be false when an error is set', function () {
            /* Given */
            var response = new Response();
            response.setStatus(200);
            response.setError(new Error('Something went booboo'));

            /* When */
            var ok = response.isOk();

            /* Then */
            expect(ok).to.be(false);
        });

        it('should be true when a 2xx status code is passed', function () {
            /* Given */
            var response = new Response();
            response.setStatus(201);

            /* When */
            var ok = response.isOk();

            /* Then */
            expect(ok).to.be(true);
        });

        it('should be false when a non 2xx status code is passed', function () {
            /* Given */
            var response = new Response();
            response.setStatus(400);

            /* When */
            var ok = response.isOk();

            /* Then */
            expect(ok).to.be(false);
        })
    })
});