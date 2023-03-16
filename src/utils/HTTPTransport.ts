enum METHODS {
    GET = 'GET',
    POST =  'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method: string;
    timeout?: number;
    data?: object
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data?: object): string {
    if (!data) {
        return '';
    }
    return Object.entries(data).reduce((acc, [key, val], index) => {
        return index + 1 !== Object.entries(data).length ? acc + `${key}=${val}&` : acc + `${key}=${val}`;
    }, Object.entries(data).length > 0 ? '?' : '');
// Можно делать трансформацию GET-параметров в отдельной функции
}

class HTTPTransport {
    public get(url: string, options: OptionsWithoutMethod = {}) {
        const str = queryStringify(options?.data);
        return this.request(url + str, {...options, method: METHODS.GET}, options.timeout);
    }

    public post(url: string, options: OptionsWithoutMethod = {}) {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    }
    public put(url: string, options: OptionsWithoutMethod = {}) {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    }

    public delete(url: string,options: OptionsWithoutMethod = {}) {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    }

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
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
                xhr.send(data);
            }
        });
    }
}

export default HTTPTransport;
