import axios from "axios";

export const handleAxiosError = (error: unknown, action: string): never => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status || "Unknown";

    const errorMessage =
      error.response?.data?.message || error.message || "No additional details";

    console.error(
      `${action}: HTTP error occurred (Status ${statusCode}): ${errorMessage}`,
      error.response?.data
    );

    throw new Error(`${action} failed with HTTP error: ${errorMessage}`);
  } else {
    console.error(`${action}: Unexpected network or runtime error:`, error);

    throw new Error(`${action} failed due to an unexpected error.`);
  }
};
