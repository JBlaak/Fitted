import BrowserRequest from './requests/browser';
import ServerRequest from './requests/server';

export default (url, config, process) => typeof XMLHttpRequest != 'undefined' ? BrowserRequest(url, config, process) : ServerRequest(url, config, process);