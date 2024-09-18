// Disable the ESLint rule 'import/prefer-default-export' for this line,
// as this file might have only one export, but we don't want to enforce the use of 'default export'.
// eslint-disable-next-line import/prefer-default-export

/**
 * Creates a custom error object with a specified HTTP status code and message.
 *
 * @param {number} status - The HTTP status code to assign to the error (e.g., 404 for "Not Found", 500 for "Server Error").
 * @param {string} message - The error message that describes the issue.
 * @returns {Error} The error object with the provided status and message properties.
 *
 * @example
 * // Example usage:
 * const error = createError(404, 'Resource not found');
 * throw error; // Throws an error with status 404 and message 'Resource not found'
 */
export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
  };