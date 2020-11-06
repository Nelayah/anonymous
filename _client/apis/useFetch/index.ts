import * as pathToRegexp from 'path-to-regexp';
import * as queryString from 'query-string';

const initFetcher = params => {
  const method = params.method.toUpperCase();
  return (data: any = {}) => {
    const isCondition = ['GET', 'DELETE'].includes(method);
    const originalURL = pathToRegexp.compile(params.url)(data);
    const url = ((isCondition || data.query) ? `${originalURL}?${queryString.stringify(data)}&timestamp=${new Date().getTime()}` : originalURL);

    console.log(`URL: ${method} `, url);
    console.log('DATA: ', data);
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': window.CSRFToken
      },
      body: !isCondition ? JSON.stringify(data) : null
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) return response.data;
      throw response;
    }).catch(error => {
      throw error;
    });
  };
};

type useFetchResult<T> = {[P in keyof T]: {[C in keyof T[P]]: (data?: any) => Promise<any>}};

function useFetch<T>(config: T): useFetchResult<T> {
  const mapping = {};
  Object.keys(config).forEach(k => {
    const subMapping = {};
    const subConfig = config[k];
    Object.keys(subConfig).forEach(subKey => {
      subMapping[subKey] = initFetcher(subConfig[subKey]);
    });
    mapping[k] = subMapping;
  });

  return mapping as useFetchResult<T>;
}

export default useFetch;