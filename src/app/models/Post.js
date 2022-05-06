const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

//const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
    {
        _id: { type: Number },
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
        _id: false,
        timestamps: true,
    },
);

// Custom query helpers
PostSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

// Add plugin
mongoose.plugin(slug);
PostSchema.plugin(AutoIncrement);
PostSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', PostSchema);
