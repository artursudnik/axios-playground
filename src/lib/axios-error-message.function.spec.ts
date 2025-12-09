import { AxiosError } from 'axios';
import { axiosErrorMessage } from './axios-error-message.function';

describe('axiosErrorMessage', function () {
  describe('when called with error.config and error.response', function () {
    const result = axiosErrorMessage({
      config: {
        method: 'GET',
        url: 'http://example.com',
      },
      response: {
        status: 500,
        statusText: 'Internal Server Error',
        data: { message: 'an error message' },
      },
      message: 'an error message',
    } as AxiosError);

    it('should return request details and response error', async function () {
      expect(result).toBe(
        'GET http://example.com (500 Internal Server Error) response body: {"message":"an error message"}',
      );
    });
  });

  describe('when called with error.config and no error.response', function () {
    const result = axiosErrorMessage({
      config: {
        method: 'GET',
        url: 'http://example.com',
      },

      message: 'an error message',
    } as AxiosError);

    it('should return request details and error message', async function () {
      expect(result).toBe('GET http://example.com: an error message');
    });
  });

  describe('when called without error.config and no error.response', function () {
    const result = axiosErrorMessage({
      message: 'an error message',
    } as AxiosError);

    it('should return only error message', async function () {
      expect(result).toBe('an error message');
    });
  });
});
