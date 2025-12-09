import * as http from 'node:http';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from './lib';

const defaultAxiosConfig: AxiosRequestConfig = {
  timeout: 5000,
};

const makeRequest = async (
  url: string,
  config: AxiosRequestConfig = {},
): Promise<void> => {
  const configWithDefaults = { ...defaultAxiosConfig, ...config };

  const start = Date.now();

  console.log(`[${new Date().toISOString()}] requesting ${url}`);

  const response = await axios
    .get(url, configWithDefaults)
    .catch(axiosErrorHandler('Error requesting', Error));

  console.log(
    `[${new Date().toISOString()}] ${url} response (${response.status} ${response.statusText}) received after ${Date.now() - start}ms`,
  );
};

// void makeRequest('http://127.0.0.1:3001/delayed/1000');
void makeRequest('http://127.0.0.1:3001/delayed/1000', {
  timeout: 2000,
  httpAgent: new http.Agent({ keepAlive: true }),
});
// void makeRequest('http://127.0.0.1:3001/delayed/infinite');
