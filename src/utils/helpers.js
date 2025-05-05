export function handleSuccess(res, data = {}, message = 'Success') {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  export function handleError(res, error, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message: error || 'Something went wrong',
    });
  }
  