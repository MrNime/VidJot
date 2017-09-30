if (process.env.node_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://nicky:nicky@ds055792.mlab.com:55792/vidjot-prod'
    };
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot-dev'
    };
};
