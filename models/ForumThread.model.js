const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumThreadSchema = new Schema(
    {
        title: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        posts: [{ type: Schema.Types.ObjectId, ref: 'ForumPost' }],
        lat: { type: Number },
        lon: { type: Number },
    },
    {
        timestamps: true,
    }
);

const ForumThread = mongoose.model('ForumThread', forumThreadSchema);

module.exports = ForumThread;