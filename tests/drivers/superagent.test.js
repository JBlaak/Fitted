import expect from 'expect.js';
import driver from '../../src/drivers/superagent';

describe('Superagent driver', function () {

    it('should get headers', function () {
        /* Given */
        const setted = new Map();
        const url = 'asdf';
        const config = {
            method: 'GET',
            _superagent: {
                get: (url) => {
                    const req = {
                        query: (query) => {
                            return req;
                        },
                        set: (key, value) => {
                            setted.set(key, value);
                            return req;
                        },
                        end: (callback) => {
                            callback({
                                status: 200,
                                body: '',
                                header: {}
                            });
                        }
                    };
                    return req;
                }
            }
        };

        /* When */
        config.headers = {
            'Accept': 'application/json',
            'X-Requested-With': 'Fitted'
        };
        driver(url, config, () => {});

        /* Then */
        expect(setted.size).to.be(2);
    })

});
