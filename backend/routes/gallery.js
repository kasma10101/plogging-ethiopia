router = require('express').Router();
const galleryController = require('../controllers/galleryController');
const imageUploader = require("../utils/imageUploader");
const fileUploader = require("../utils/fileUploader")


router.get('/', galleryController.getGallerys);

router.post('/', imageUploader, galleryController.createGallery);

router.post('/userUploadedFiles', fileUploader, galleryController.uploadFiles);

router.get('/userUploadedFiles', galleryController.getUploadedFiles);

router.delete('/userUploadedFiles/:id', galleryController.deleteUploadedFile);

router.put('/:id', galleryController.updateGallery);

router.delete('/:id', galleryController.deleteGallery);

module.exports = router;