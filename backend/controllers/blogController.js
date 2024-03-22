const Gallery = require('../models/gallery'); // Adjust the path as necessary
const UserUploadedData = require('../models/userUploadedData');

const getGallerys = async (req, res) => {
  try {
    const gallerys = await Gallery.findAll();
    res.send({
      gallery: gallerys,
      totalCount: gallerys.length,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (gallery) {
      res.send(gallery);
    } else {
      res.status(404).send({ message: 'Gallery not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const createGallery = async (req, res) => {
  try {
    const gallery = await Gallery.create(req.body);
    res.send(gallery);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateGallery = async (req, res) => {
  try {
    const [updated] = await Gallery.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedGallery = await Gallery.findByPk(req.params.id);
      res.send(updatedGallery);
    } else {
      res.status(404).send({ message: 'Gallery not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const deleted = await Gallery.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.send({ message: 'Gallery deleted' });
    } else {
      res.status(404).send({ message: 'Gallery not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const uploadFiles = async (req, res) => {
  try {
    const userUploadedData = await UserUploadedData.create(req.body);
    res.send(userUploadedData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getUploadedFiles = async (req, res) => {
  try {
    const userUploadedData = await UserUploadedData.findAll();
    res.send(userUploadedData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteUploadedFile = async (req, res) => {
  try {
    const deleted = await UserUploadedData.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.send({ message: 'File deleted' });
    } else {
      res.status(404).send({ message: 'File not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getGallerys,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  uploadFiles,
  getUploadedFiles,
  deleteUploadedFile,
};
