import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: [true, 'User ID is required']
        },
        title: {
            type: String,
            trim: true,
            required: [true, 'Title is required']
        },
        amount: {
            type: Number,
            min: [0, 'Amount cannot be lesser than 0'],
            required: [true, 'Amount is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
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
            required: [true, 'Category is required']
        },
        description: {
            type: String,
            trim: true
        },
        recurring: {
            type: Boolean
        },
        remind_after_days: {
            type: Number,
            min: [0, 'Days cannot be lesser than 0']
        }
    }
)

export default mongoose.model('transactions', transactionSchema)