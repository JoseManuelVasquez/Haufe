const NodeCache = require('node-cache');
const { Cache } = require('../services/cache');

const cacheMiddleware = (req, res, next) => {
    const cache = new NodeCache();
    Cache.injectCache(cache);
    next();
};

module.exports = {
    cacheMiddleware
};