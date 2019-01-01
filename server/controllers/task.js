const _ = require('lodash');

const {Task} = require('../model/task');

exports.add = (req, res) => {
    let todo = new Task({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        console.log('Todo saved');
        res.send(doc)
    }, (err) => {
        console.log('Todo error', err.message);
        res.status(400).send(err)
    })
};

exports.get = (req, res) => {
    Task.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({
            todos
        })
    }, (err) => {
        res.status(400).send(err)
    })
};

exports.getById = (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    Task.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }

        res.send({todo})
    }).catch((err) => {
        res.status(400).send()
    })
};

exports.delete = (req, res) => {
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    Task.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send()
        }

        res.send({todo})
    }).catch((err) => {
        res.status(400).send()
    })
};

exports.update = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Task.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }

        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    })
};