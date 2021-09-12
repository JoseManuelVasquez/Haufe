/**
 * Cache
 */
let Cache = () => {};

Cache.injectCache = (cache) => {
    Cache.cache = cache;
};

Cache.getInstance = () => {
    return Cache.cache
};

module.exports = {
    Cache
};