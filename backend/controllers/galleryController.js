//controllers of gallery
Gallery = require('../models/gallery');
UserUploadedData = require('../models/userUploadedData');

const getGallerys = async function(req, res, next) {
  try{

    const gallerys = await Gallery.find();


    res.send(
      {
        gallery: gallerys,
        totalCount: gallerys.length,
      }
    );
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getGallery = async function(req, res, next) {
  try{
    const gallery = await Gallery.findById(req.params.id);
    res.send(gallery);

  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const createGallery = async function(req, res, next) {

  try {
    const gallery = await Gallery.create(req.body);
    res.send(gallery);

  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const updateGallery = async function(req, res, next) {

  try{
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(gallery)

  } catch(error){
    res.status(400).send({message: error.message});

  }
};

const deleteGallery = async function(req, res, next) {

  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    res.send(gallery);

  } catch (error) {

    res.status(400).send({message: error.message});
  }
};

const uploadFiles = async function(req, res, next) {
  try {
    const userUploadedData = await UserUploadedData.create(req.body);
    res.send(userUploadedData);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}

const getUploadedFiles = async function(req, res, next) {
  try {
    const userUploadedData = await UserUploadedData.find();
    res.send(userUploadedData);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}

const deleteUploadedFile = async function(req, res, next) {
  try {
    const userUploadedData = await UserUploadedData.findByIdAndDelete(req.params.id);
    res.send(userUploadedData);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}

module.exports = {
  getGallerys,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  uploadFiles,
  getUploadedFiles,
  deleteUploadedFile
};