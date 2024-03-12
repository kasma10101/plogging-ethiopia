router = require('express').Router();
const memberController = require('../controllers/memberController');
const imageUploader = require("../utils/imageUploader");


router.get('/', memberController.getMembers);
router.get('/admin', memberController.getAdmin);

router.post('/', memberController.createMember);

router.put('/:id', memberController.updateMember);

router.delete('/:id', memberController.deleteMember);

router.post('/admin/create', memberController.createAdmin);

// router.post('/admin/login', memberController.adminLogin);

module.exports = router;