

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    loginId: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, required: true },
    createdOn: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("Admins", AdminSchema);
