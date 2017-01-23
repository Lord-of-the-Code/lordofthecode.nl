var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: {
		type: Types.LocalFile,
		dest: 'public/files',
		prefix: '/files/',
		filename: function(item, file){
			return item.id + '.' + file.extension
		}
	},
	content: { type: Types.Html, wysiwyg: true },
	url: { type: Types.Url }
});

Gallery.register();
