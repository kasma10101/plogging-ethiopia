const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/');
  },
  filename: (req, file, cb) => {

    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const fileUploadMiddleware = upload.single('image');


// Middleware function
const imageUploader = (req, res, next) => {
  fileUploadMiddleware(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('File upload failed.');
    }
    try {
      req.body.imageUrl = req.file.filename;
      next();

    } catch (error) {

      res.status(500).send('Internal Server Error');
    }
  });
};

module.exports = imageUploader;
