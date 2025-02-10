const BlogData = require("../models/blogData");
const fileController = require("../controller/fileController");

const blogController = {
    getAllBlogs: async (req, res) => {
        try {
            const data = await BlogData.find();
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    getSelectedBlog: async (req, res) => {
        try {
            console.log("GETSELECTED BLOG", req.params.id);
            const id = req.params.id;
            const data = await BlogData.findById(id).populate("modifiedBy").populate("image").populate("video");
            if (!data) {
                return res.status(404).json({ message: "Blogs not found" });
            }
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    addNewBlog: async (req, res) => {
        try {
            console.log("addNewblog : ", req.body);
            let { _id, title, author, content, summary, tags, publishedDate, updatedDate, image, video, views, likes, isFeatured, modifiedBy, isEdit } = req.body;
            if (!title) {
                return res.status(400).json({ message: "Title is mandatory" });
            }
            else if (!author) {
                return res.status(400).json({ message: "Author is mandatory" });
            }
            else if (!content) {
                return res.status(400).json({ message: "Content is mandatory" });
            }
            if (image && image.upload) {
                const imageUpload = await fileController.addNewFile(res, image);
                console.log("imageUploadStatus :", imageUpload);
                if (!imageUpload) {
                    return res.status(500).json({ message: "Error in image Uplaod" });
                }
                image = imageUpload ? imageUpload._id : image._id;
            }
            if (video && video.upload) {
                const videoUpload = fileController.addNewFile(res, video);
                console.log("videoUploadStatus :", videoUpload);
                if (!videoUpload) {
                    return res.status(500).json({ message: "Error in video Uplaod" });
                }
                video = videoUpload ? videoUpload._id : video._id;
            }

            const newBlog = new BlogData({
                title: title,
                author: author,
                content: content,
                summary: summary,
                tags: tags,
                publishedDate: publishedDate,
                updatedDate: updatedDate,
                image: image,
                video: video,
                views: views,
                likes: likes,
                isFeatured: isFeatured,
                modifiedBy: modifiedBy,
                modifiedOn: new Date(),
            });
            let data = null;
            if (isEdit) {
                data = await BlogData.findByIdAndUpdate(_id, {
                    title: title,
                    author: author,
                    content: content,
                    summary: summary,
                    tags: tags,
                    publishedDate: publishedDate,
                    updatedDate: updatedDate,
                    image: image,
                    video: video,
                    views: views,
                    likes: likes,
                    isFeatured: isFeatured,
                    modifiedBy: modifiedBy,
                    modifiedOn: new Date(),
                }, { new: true });
                //data = await Blog.updateOne({ _id: _id }, { $set: newBlog });
            }
            else {
                data = await newBlog.save();
            }
            if (!data) {
                return res.status(500).json({ message: "Error in adding new blog" });
            }
            return res.json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = blogController;
