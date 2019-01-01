const {User} = require('./../model/user');

const {MyError} = require('./../model/error');

exports.authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject(new MyError(401, "User not found"))
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        // res.status(401).send(err)
        console.error(err);
        next(err)
    })
};