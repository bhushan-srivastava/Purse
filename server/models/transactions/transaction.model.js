import mongoose from "mongoose"
import validator from 'validator'

const transactionSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: [true, 'User ID is required']
        },
        title: {
            type: String,
            trim: true,
            required: [true, 'Title is required'],
            minLength: [4, 'Title must have atleast 4 characters'] // if err then change to 'minlength' (no camelCase)
        },
        amount: {
            type: Number,
            min: [0, 'Amount cannot be lesser than 0'],
            required: [true, 'Amount is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
            validate: {
                validator: validator.isDate,
                message: 'Date is invalid'
            }
        },
        type: {
            type: String,
            trim: true,
            required: [true, 'Type is required'],
            enum: {
                values: ['Spent', 'Earned'],
                message: 'Type can be Spent/Earned'
            }
        },
        category: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'Category is required']
        },
        description: {
            type: String,
            trim: true
        },
        recurring: {
            type: Boolean,
            set: function (value) {
                return value && this.remind_after_days ? value : undefined
            }
        },
        remind_after_days: {
            type: Number,
            min: [0, 'Days cannot be lesser than 0'],
            required: [
                function () {
                    return this.recurring ? true : false
                },
                'Email reminder after how many days?'
            ],
            set: function (value) {
                return this.recurring && value ? value : undefined
            }
        }
    }
)

const Transactions = mongoose.model('transactions', transactionSchema)

export default Transactions