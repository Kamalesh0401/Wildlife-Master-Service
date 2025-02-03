const FileData = require("../models/filesData");

const fileController = {
    getFilesByDirectory: async (req, res) => {
        try {
            const data = await FileData.find({ file_dir: req.params.file_dir });
            console.log("GET All Files : ", data);
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    addNewFile: async (res, filedata) => {
        try {
            console.log("AddNew Files request: ", filedata);
            const newFile = new FileData({
                file_name: filedata.file_name,
                file_url: filedata.file_url,
                file_dir: filedata.file_dir,
                is_video: filedata.is_video,
                modifiedBy: filedata.modifiedBy,
                modifiedOn: new Date(),
            });
            let data = null;
            data = await newFile.save();
            console.log("AddNew SAVE data : ", data);
            if (!data) {
                return res.status(404).json({ message: "Error in File Upload" });
            }
            //return res.json(data);
            return data;
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = fileController;
