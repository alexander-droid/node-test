const _ = require('lodash');

const {User} = require('../model/user');

exports.signup = (req, res) => {
    let body = _.pick(req.body, ['name', 'email', 'password']);
    let user = User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err)
    })
};

exports.login = (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((err) => {
        res.status(400).send(err);
    });
};

exports.logout = (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
};

exports.get = (req, res) => {
    let token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject()
        }
        res.status(200).send({user})
    }).catch(() => {
        res.status(400).send()
    })
};