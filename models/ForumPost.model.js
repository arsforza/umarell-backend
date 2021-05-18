const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumPostSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        images: [{ type: String }],
        content: { type: String, default: '' },
        thread: { type: Schema.Types.ObjectId, ref: 'ForumThread', required: true },
    },
    {
        timestamps: true,
    }
);

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

module.exports = ForumPost;