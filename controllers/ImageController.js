const _ = require('lodash');
const path = require('path');

const uploadImage = (req, res, next) => {
	var files;
	var files2;
	var file = req.file.filename;
	var original = req.file.originalname
	var matches = file.match(/^(.+?)_.+?\.(.+)$/i);
	var matches2 = original.match(/^(.+?)_.+?\.(.+)$/i);

	if (matches || matches2) {
		files = _.map(['lg', 'md', 'sm'], (size) => {
			return matches[1] + '_' + size + '.' + matches[2];
		});
	} else {
		files = [file];
	}

	files = _.map(files, (file) => {
		var port = req.app.get('port');
		var base = req.protocol + '://' + req.hostname + (port ? ':' + port : process.env.PORT);
		var url = path.join(req.file.baseUrl, file).replace(/[\\\/]+/g, '/').replace(/^[\/]+/g, '');

		return (req.file.storage == 'local' ? base : '') + '/' + url;
	});

	res.status(201).json({
		images: files
	});
}

module.exports = { uploadImage }