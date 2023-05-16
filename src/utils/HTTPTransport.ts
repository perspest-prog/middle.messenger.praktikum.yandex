enum METHODS {
    GET = 'GET',
    POST =  'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

interface Options {
    method: string;
    timeout?: number;
    data?: object
}

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

function queryStringify(data?: object): string {
    if (!data) {
        return '';
    }
    return Object.entries(data).reduce((acc, [key, val], index) => {
        return index + 1 !== Object.entries(data).length ? acc + `${key}=${val}&` : acc + `${key}=${val}`;
    }, Object.entries(data).length > 0 ? '?' : '');
}

class HTTPTransport {
    public get: HTTPMethod = (url, options = {}) => {
        const str = queryStringify(options?.data);
        return this.request(url + str, {...options, method: METHODS.GET}, options.timeout);
    };

    public post: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    public put: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    public delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    private request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as XMLHttpRequestBodyInit);
            }
        });
    }
}

export default HTTPTransport;
