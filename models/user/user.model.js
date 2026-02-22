import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required'],
            minLength: [4, 'Name must have atleast 4 characters']
        },
        email: {
            type: String,
            trim: true,
            unique: [true, 'Email already exists'],
            validate: {
                validator: validator.isEmail,
                message: 'Please fill a valid email address'
            },
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must have atleast 8 characters']
        },
        reset_code: {
            type: String
        },
        activeSessions: [{
            type: String,
        }]
    }
)

userSchema.pre('save', async function (next) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)

    if (this.reset_code) {
        this.reset_code = await bcrypt.hash(this.reset_code, saltRounds);
    }
    else if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

const Users = mongoose.model('users', userSchema)

export default Users
