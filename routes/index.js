const express = require('express');
const router = express.Router();
const { multerUpload } = require('../middlewares/multer');
const ImageController = require('../controllers/ImageController');

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Upload Avatar', avatar_field: process.env.AVATAR_FIELD });
});

router.post('/upload', multerUpload, ImageController.uploadImage)

module.exports = router;