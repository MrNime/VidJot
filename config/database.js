if (process.env.node_ENV === 'production') {
    module.exports = {
        mongoURI: process.env.MONGODB_URI
    };
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot-dev'
    };
};
