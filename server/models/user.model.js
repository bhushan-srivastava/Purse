import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            trim: true,
            unique: [true, 'Email already exists'],
            // match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            validate: {
                validator: validator.isEmail,
                message: 'Please fill a valid email address'
            },
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must have atleast 8 characters'] // if err then change to 'minlength' (no camelCase)
        },
        reset_code: {
            type: Number
        }
    }
)

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const saltRounds = 10

    // generate a salt and hash on separate function calls
    // const salt = await bcrypt.genSalt(saltRounds);
    // this.password = await bcrypt.hash(this.password, salt);

    // auto-gen a salt and hash
    this.password = await bcrypt.hash(this.password, saltRounds);

    next();
})

const Users = mongoose.model('users', userSchema)

export default Users