const handleApiError = (error) => {
    if (error.response) {
        // handle different status codes
    } else if (error.request) {
        // The request was made but no response was received
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('General error:', error.message);
    }

    // Return a custom error object or throw the original error
    // You can customize this based on your application's needs
    return {
        success: false,
        message: 'An error occurred while processing the request.',
        originalError: error,
    };
};

export default handleApiError;
