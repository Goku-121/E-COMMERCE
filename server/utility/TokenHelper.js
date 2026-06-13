const jwt = require('jsonwebtoken');

const KEY = process.env.JWT_SECRET || "123-ABC-XYZ";

exports.EncodeToken = (email, user_id) => {
    return jwt.sign({ email, user_id }, KEY, { expiresIn: '24h' });
};

exports.DecodeToken = (token) => {
    try {
        return jwt.verify(token, KEY);
    } catch (e) {
        return null;
    }
};