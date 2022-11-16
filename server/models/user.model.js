import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Name is required'
        },
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            required: 'Email is required'
        },
        password: {
            type: String,
            required: 'Password is required',
            minLength: [8, 'Password must have atleast 8 characters']
        }
    }
)

export default mongoose.model('users', userSchema)