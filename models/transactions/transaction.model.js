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
            },
            set: function (value) {
                return new Date(new Date(value).setHours(0, 0, 0, 0))
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
        },
        remind_on: {
            type: Date,
            // required: [
            //     function () {
            //         return this.recurring ? true : false
            //     },
            //     'When do you want an email reminder?'
            // ],
            validate: {
                validator: function (value) {
                    return value > this.date
                },
                message: 'Reminder date cannot be earlier than the transaction date'
            },
            set: function (value) {
                if (this.recurring && value) {
                    return new Date(new Date(value).setHours(0, 0, 0, 0))
                }

                return undefined
            }
        }
    }
)

const Transactions = mongoose.model('transactions', transactionSchema)

export default Transactions