// get error message
const getErrorMessages = (error) => {
    // console.log(err.message, err.code);
    // let errorMessage = ""

    // // incorrect email
    // if (err.message === 'incorrect email') {
    //     errors.email = 'That email is not registered';
    // }

    // // incorrect password
    // if (err.message === 'incorrect password') {
    //     errors.password = 'That password is incorrect';
    // }

    // // duplicate email error
    // if (err.code === 11000) {
    //     errorMessage += 'Email is already in use';
    // }

    // // user validation errors
    // if (err.message.includes('user validation failed')) {
    //     Object.values(err.errors).forEach(({ properties }) => {
    //         errorMessage = properties.message;
    //     });
    // }

    let errorMessage = ""

    if (error.code === 11000) {
        errorMessage += "Email is already registered to a user "
    }

    // if (error.message.includes('validation failed')) {
    if (error.name === "ValidationError") {
        Object.values(error.errors).forEach((errorField) => {
            if (errorField.name === 'CastError') {
                errorMessage += 'Invalid value for ' + errorField.path
            }
            else {
                errorMessage += errorField.message + " "
            }
        })
    }

    if (error.message === 'data and hash arguments required') {
        errorMessage += "Please enter all the details"
    }

    if (error.name === 'CastError') {
        errorMessage += "Incorrect ID"
    }

    if (!errorMessage) {
        errorMessage = error.message
    }

    return errorMessage;
}

export default getErrorMessages