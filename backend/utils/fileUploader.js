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

const fileUploadMiddleware = upload.single('file');

const fileUploader = (req, res, next) => {
  fileUploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(500).send('File upload failed.');
    }

    // Extract additional information from the uploaded file and add it to the request body
    req.body.fileName = req.file.filename;
    req.body.fileType = req.file.mimetype;
    req.body.name = req.file.originalname;

    next();
  });
};

module.exports = fileUploader;