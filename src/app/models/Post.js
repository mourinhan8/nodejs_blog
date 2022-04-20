const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Post = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        img: { type: String },
        videoID: { type: String, required: true },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);
Post.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', Post);
