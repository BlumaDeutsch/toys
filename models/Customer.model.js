const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true,
    },
    date_created: {
        type: Date,
        required: false,
        default: new Date()
    },
    toys: [{
        type: mongoose.Types.ObjectId,
        ref: 'Toy',
    }]
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports.Customer = Customer;