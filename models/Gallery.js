var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
});

var GalleryStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: 'public/files',
		publicPath: '/files',
	},
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: {
		type: Types.File,
		storage: GalleryStorage,
		filename: function (item, file) {
			return item.id + '.' + file.extension;
		},
	},
	content: { type: Types.Html, wysiwyg: true },
	url: { type: Types.Url },
});

Gallery.register();
