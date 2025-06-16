import axios from "axios";
import { useState } from "react";

/**
 * Custom hook to handle HTTP requests with error handling.
 * @param {string} url - The URL to send the request to
 * @param {string} method - The HTTP method to use (e.g., 'get', 'post', 'put', 'delete')
 * @param {Object} body - The body of the request, if applicable
 * @returns {Object} - An object containing errors markup and a function to perform the request
 */
export default function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null); // Clear previous errors
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Problem signing up...</h4>
          <ul className="my-0">
            {error.response.data.errors.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { errors, doRequest };
}
