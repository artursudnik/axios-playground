import axios, { AxiosError } from 'axios';

/**
 * Generates a descriptive error message for an Axios error object.
 *
 * The function processes the provided AxiosError object and constructs
 * an error message string. The message includes the HTTP method, request URL,
 * status code, status text (if available), and an error description.
 *
 * @param {AxiosError} error - The Axios error object to process.
 * @returns {string} A string describing the error, including
 *                   request details and error status if available.
 */
export const axiosErrorMessage = (error: AxiosError): string => {
  let errorMessage = '';

  if (error.config) {
    const requestUrl = axios.getUri(error.config);
    const requestMethod = error.config.method?.toUpperCase();

    errorMessage = `${requestMethod} ${requestUrl}`;
  }

  if (error.response) {
    let responseBody: string;

    try {
      responseBody = JSON.stringify(error.response.data);
    } catch (jsonError) {
      responseBody =
        `[Unserializable response data: ` +
        `${jsonError instanceof Error ? jsonError.message : String(jsonError)}]`;
    }

    errorMessage +=
      ` (${error.response.status} ${error.response.statusText}) ` +
      `response body: ${responseBody}`;
  } else {
    errorMessage += (errorMessage === '' ? '' : ': ') + error.message;
  }

  return errorMessage;
};
