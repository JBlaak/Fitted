import Browser from './http/browser';
import Server from './http/server';

export default (url, config, callback) => typeof XMLHttpRequest != 'undefined' ? Browser(url, config, callback) : Server(url, config, callback);
