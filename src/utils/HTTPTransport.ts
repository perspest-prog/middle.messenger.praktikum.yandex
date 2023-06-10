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
type HTTPMethod<T = unknown> = (url: string, options?: OptionsWithoutMethod) => Promise<T>;

function queryStringify(data?: object): string {
    if (!data) {
        return '';
    }
    return Object.entries(data).reduce((acc, [key, val], index) => {
        return index + 1 !== Object.entries(data).length ? acc + `${key}=${val}&` : acc + `${key}=${val}`;
    }, Object.entries(data).length > 0 ? '?' : '');
}

class HTTPTransport {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public get<T>(url: string, options: OptionsWithoutMethod = {}) {
        const str = queryStringify(options?.data);
        return this.request<T>(url + str, {...options, method: METHODS.GET}, options.timeout);
    }

    public post: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    public put: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    public delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    private request<T>(url: string, options: Options, timeout = 5000) {
        const {method, data} = options;

        return new Promise<T>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, this.url + url);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  if (xhr.status < 400) {
                    resolve(xhr.response);
                  } else {
                    reject({...xhr.response, code: xhr.status});
                  }
                }
            };

            xhr.onload = function() {
                resolve(xhr as T);
            };

            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = "json";
            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data instanceof FormData ? data : JSON.stringify(data));
            } 
        }); 
    }
}

export default HTTPTransport;
