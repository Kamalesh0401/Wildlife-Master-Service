const mongoose = require('mongoose');

const SpeciesProfileDataSchema = new mongoose.Schema({
    commonName: { type: String, required: true },
    scientificName: { type: String, required: true },
    habitat: { type: String, required: true },
    diet: { type: String, required: false },
    behavior: { type: String, required: true },
    conservationStatus: { type: String, required: false },
    funFacts: { type: String, required: false },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Files", required: false },
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Files", required: false },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    modifiedOn: { type: Date, default: Date.now, required: true }
});

const FilesSchema = new mongoose.Schema({
    file_name: { type: String, required: true },
    file_url: { type: String, required: true },
    file_dir: { type: String, required: true },
    is_video: { type: Boolean, required: true },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    modifiedOn: { type: Date, default: Date.now, required: true }
});


const AdminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminPassword: { type: String, required: true },
    adminStatus: { type: Boolean, required: true },
});

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
});

const CommentsSchema = new mongoose.Schema({
    blogid: { type: mongoose.Schema.Types.ObjectId, ref: "BlogsData", required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Name of the user commenting
    commentText: { type: String, required: true }, // Comment text
    commentedAt: { type: Date, default: Date.now }, // Timestamp of the comment
});

module.exports = mongoose.model('Files', FilesSchema);
module.exports = mongoose.model('Admin', AdminSchema);
module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Comments', CommentsSchema);
module.exports = mongoose.model('SpeciesProfileData', SpeciesProfileDataSchema);