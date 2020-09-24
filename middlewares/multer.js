const _ = require('lodash');
const multer = require('multer');
const ImageService = require('../services/image');

var limits = {
	files: 1, // allow only 1 file per request
	fileSize: 1024 * 1024, // 1 MB (max file size)
};

var fileFilter = (req, file, cb) => {
	// supported image file mimetypes
	var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

	if (_.includes(allowedMimes, file.mimetype)) {
		// allow supported image files
		cb(null, true);
	} else {
		// throw error for invalid files
		cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
	}
};

// setup multer
const upload = multer({
	storage: ImageService.AvatarStorage({
		square: true,
        responsive: true,
        greyscale: false,
        quality: 90
	}),
	limits: limits,
	fileFilter: fileFilter
});

const multerUpload = upload.single(process.env.AVATAR_FIELD)

module.exports = { multerUpload }