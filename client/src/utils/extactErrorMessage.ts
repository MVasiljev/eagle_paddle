import axios from "axios";

export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.data?.error) {
    return error.response.data.error;
  }
  return "An unknown error occurred.";
};
