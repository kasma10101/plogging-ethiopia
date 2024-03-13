router = require('express').Router();
const blogController = require('../controllers/blogController');
const memberController = require('../controllers/memberController');
const imageUploader = require("../utils/imageUploader");


router.get('/', blogController.getBlogs);
router.post('/', imageUploader, blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

router.post('/reset', blogController.forgotPassword);



module.exports = router;