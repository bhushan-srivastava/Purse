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
            errorMessage += errorField.message + " "
        })
    }

    return errorMessage;
}

export default getErrorMessages