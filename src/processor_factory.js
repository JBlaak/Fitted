/**
 * Get the appropriate processor for the response
 * @param response Response
 * @return function
 */
export default function ProcessorFactory(response) {
    var contentType = response.getHeaders()['content-type'];
    if (
        contentType
        && contentType.indexOf('application/json') !== -1
        && typeof response.getBody() == 'string'
    ) {
        return () => {
            const body = JSON.parse(json);
            response.setBody(body);
            return response;
        }
    }

    if (typeof response.getBody() == 'object') {
        return () => response
    }

    throw new Error('No processor found for Content-Type: ' + contentType);

};
