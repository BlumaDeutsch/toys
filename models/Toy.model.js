const mongoose = require("mongoose");
const toySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true,
        default: "toy"
    },
    category: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    date_ceated: {
        type: Date,
        required: true,
        default: new Date()
    },
    id_user: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
    }
    
});

const Toy = mongoose.model("Toy", toySchema);
module.exports.Toy = Toy;