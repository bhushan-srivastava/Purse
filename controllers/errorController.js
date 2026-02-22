import AppError from "./appError.js";

// convert known db/auth errors into friendly client messages
const getErrorMessages = (error) => {
    let errorMessage = "";

    if (error?.code === 11000 || error?.message?.includes("E11000 duplicate key error")) {
        const duplicateField = Object.keys(error?.keyValue || {})[0];
        if (duplicateField === "email" || error?.message?.includes("index: email_1")) {
            errorMessage += "Email is already registered";
        } else if (duplicateField) {
            errorMessage += `${duplicateField} already exists`;
        } else {
            errorMessage += "Duplicate value already exists";
        }
    }

    if (error?.name === "ValidationError") {
        Object.values(error.errors || {}).forEach((errorField) => {
            if (errorField?.name === "CastError") {
                errorMessage += `Invalid value for ${errorField.path} `;
            } else if (errorField?.message) {
                errorMessage += `${errorField.message} `;
            }
        });
    }

    if (error?.message === "data and hash arguments required") {
        errorMessage += "Please enter all the details";
    }

    if (error?.name === "CastError") {
        errorMessage += "Incorrect ID";
    }

    if (error?.name === "JsonWebTokenError") {
        errorMessage += "Invalid session token. Please login again";
    }

    if (error?.name === "TokenExpiredError") {
        errorMessage += "Session expired. Please login again";
    }

    if (!errorMessage) {
        errorMessage = error?.message || "Something went wrong";
    }

    return errorMessage.trim();
};

const formatErrorForResponse = (error) => {
    if (error?.isOperational) {
        return error;
    }

    const message = getErrorMessages(error);
    let statusCode = error?.statusCode || 500;

    if (error?.code === 11000 || error?.message?.includes("E11000 duplicate key error")) {
        statusCode = 409;
    } else if (error?.name === "ValidationError" || error?.name === "CastError" || error?.message === "data and hash arguments required") {
        statusCode = 400;
    } else if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
        statusCode = 401;
    }

    return new AppError(message, statusCode);
};

const globalErrorHandler = (err, req, res, next) => {
    const formattedError = formatErrorForResponse(err);
    const statusCode = formattedError.statusCode || 500;
    const status = formattedError.status || (`${statusCode}`.startsWith('4') ? 'fail' : 'error');
    const message = formattedError.message || 'Something went wrong';

    // dev, keeping stack trace for easier debugging
    if (process.env.NODE_ENV !== 'production') {
        res.status(statusCode).json({
            status,
            message,
            stack: formattedError.stack
        });
        return;
    }

    // prod
    res.status(statusCode).json({ status, message });
};

export default globalErrorHandler;
