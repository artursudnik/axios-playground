import { AxiosError } from 'axios';
import { axiosErrorHandler } from './axios-error-handler.function';
import * as axiosErrorMessageExport from './axios-error-message.function';

describe('axiosErrorHandler', () => {
  const customMessage = 'Custom error message';

  it('should throw a formatted error for an Axios error', () => {
    const axiosErrorMessageMock = jest.spyOn(
      axiosErrorMessageExport,
      'axiosErrorMessage',
    );

    const axiosErrorInstance = new AxiosError('a message', '500');

    axiosErrorMessageMock.mockReturnValueOnce('parsed axios error message');
    class CustomError extends Error {}

    try {
      axiosErrorHandler(customMessage, CustomError)(axiosErrorInstance);
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (!(error instanceof Error)) throw new Error('this should not happen');
      expect(error.message).toBe(
        `${customMessage}: parsed axios error message`,
      );
    }
  });

  it('should rethrow the original error if it is not an Axios error', () => {
    const nonAxiosError = new Error('Regular error');
    class CustomError extends Error {}

    expect(() =>
      axiosErrorHandler(customMessage, CustomError)(nonAxiosError),
    ).toThrow(new CustomError(`${customMessage}: ${nonAxiosError}`));
  });
});
