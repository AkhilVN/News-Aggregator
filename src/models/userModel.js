const mongoose = require('mongoose');
schema = mongoose.Schema;

const userSchema = new schema({
    fullname: {
        type: String,
        required: [true, "Full name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                // email validate regex
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: "Email is not valid"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema);