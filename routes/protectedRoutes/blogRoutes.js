const express = require('express');
const router = express.Router();
const blogController = require('../../controller/blogController');

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getSelectedBlog);
router.post('/saveblogs', blogController.addNewBlog);


module.exports = router;