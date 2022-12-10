import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"

const constructTransaction = ({ email, user, ...rest }) => {
    return { user_id: user._id, ...rest }
}

export { constructTransaction }