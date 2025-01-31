const BlogData = require("../models/blogData");

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
            const data = await BlogData.findById(id).populate("modifiedBy");
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
            console.log("addblog : ", req.body);
            const { _id, title, author, content, summary, tags, publishedDate, updatedDate, image, video, views, likes, isFeatured, modifiedBy, modifiedOn, isEdit } = req.body;
            if (!title) {
                return res.status(404).json({ message: "Title is mandatory" });
            }
            else if (!author) {
                return res.status(404).json({ message: "Author is mandatory" });
            }
            else if (!content) {
                return res.status(404).json({ message: "Content is mandatory" });
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
            if (isEdit)
                data = await BlogData.findById(_id).updateOne(newBlog);
            else
                data = await BlogData.save(newBlog);

            if (!data) {
                return res.status(404).json({ message: "Blogs not found" });
            }
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = blogController;
