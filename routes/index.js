module.exports = function(app) {
    app.use('/api/staff', require('./user.js'));
};
