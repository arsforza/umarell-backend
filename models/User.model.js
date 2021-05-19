const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, unique: true },
        password: String,
        role: { type: String, default: 'user' },
        avatar: { type: String, default: 'https://res.cloudinary.com/dbt2ubezb/image/upload/v1621456216/umarell/user_avatars/_default_avatar.png' },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;