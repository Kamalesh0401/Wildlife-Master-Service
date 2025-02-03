const mongoose = require("mongoose");

const FilesSchema = new mongoose.Schema({
    file_name: { type: String, required: true },
    file_url: { type: String, required: true },
    file_dir: { type: String, required: true },
    is_video: { type: Boolean, required: true },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admins", required: true },
    modifiedOn: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("Files", FilesSchema);
