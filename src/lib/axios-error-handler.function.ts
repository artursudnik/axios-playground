import axios from 'axios';
import { axiosErrorMessage } from './axios-error-message.function';

/**
 * A function that returns an error handler to process errors, specifically targeting Axios errors.
 *
 * @template T - The type of error to be thrown.
 * @param {string} message - A message to prepend to the error message.
 * @param {new (...args: any[]) => T} errorTypeToBeThrown - the error type to be thrown.
 * @returns {(err: unknown) => never} A function that takes an unknown error and throws it as the specified type.
 *
 * @throws {T} Throws the provided error type with an appropriate message detailing the error.
 * If the error is an Axios error, includes Axios-specific details in the message.
 */
export const axiosErrorHandler =
  <T extends Error>(
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorTypeToBeThrown: new (...args: any[]) => T,
  ): ((err: unknown) => never) =>
  (err: unknown): never => {
    if (axios.isAxiosError(err)) {
      throw new errorTypeToBeThrown(`${message}: ${axiosErrorMessage(err)}`);
    }

    throw new errorTypeToBeThrown(`${message}: ${err}`);
  };
