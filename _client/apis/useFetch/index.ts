import * as pathToRegexp from 'path-to-regexp';
import * as queryString from 'query-string';
import Config from 'react-native-config';
import {DeviceEventEmitter} from 'react-native';
import { FetchResult } from 'react-native';

const initFetcher = params => {
  const method = params.method.toUpperCase();
  return (data: any = {}) => {
    const isCondition = ['GET', 'DELETE'].includes(method);
    const originalURL = pathToRegexp.compile(params.url)(data);
    const url = Config.BACKEND_URL + ((isCondition || data.query) ? `${originalURL}?${queryString.stringify(data)}&timestamp=${new Date().getTime()}` : originalURL);
    
    console.log(`URL: ${method} `, url);
    console.log('DATA: ', data);
    return fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth-token': global['jwt'] || ''
      },
      body: !isCondition ? JSON.stringify(data) : null
    })
    .then(response => response.ok ? response.json() : response)
    .then(response => {
      if (Number(response.status) === 0) return response.data;
      throw response;
    }).catch(error => {
      console.error(error);
      DeviceEventEmitter.emit('system.showToast', error.message);
      throw error;
    })
  }
}

type useFetchResult<T> = {[P in keyof T]: {[C in keyof T[P]]: (data?: any) => Promise<FetchResult>}};

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