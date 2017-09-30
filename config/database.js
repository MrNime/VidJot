if (process.env.MONGODB_URI) {
    module.exports = {
        mongoURI: process.env.MONGODB_URI
    };
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot-dev'
    };
};
