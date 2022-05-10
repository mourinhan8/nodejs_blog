module.exports = (req, res, next) => {
    res.locals._token = req.csrfToken();
    next();
};
