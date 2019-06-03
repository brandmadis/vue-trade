// model imports for default API CRUD

var Todo = require('../models/Todo');
var Note = require('../models/Note');

var express = require('express');
var router = express.Router();

var logger = function (req, res, next) {
    console.log("GOT REQUEST !");
    next(); // Passing the request to the next handler in the stack.
}



console.log('route.js request here ');

router.route('/').get((req, res) => {

    console.log('/  here ');
    res.status(200).json({
        'message': '/ route here  '
    });
});


router.route('/create').post((req, res) => {
    console.log('create route ..' + req.body);

    var todo = new Todo(req.body);
    console.log(todo);

    //res.status(200).json({
    //    'message': 'Todo successfully added '
    //});

    todo.save().then(todo => {
            res.status(200).json({
                'message': 'Todo successfully added '
            });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });

});

router.route('/todos').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

router.route('/todos/:id').get((req, res) => {
    var id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

router.route('/todos/:id').put((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo)
            return next(new Error('Error getting the todo!'));
        else {
            todo.name = req.body.name;
            todo.save().then(todo => {
                    res.json('Todo updated successfully');
                })
                .catch(err => {
                    res.status(400).send("Error when updating the todo");
                });
        }
    });
});

router.route('/todos/:id').get((req, res) => {
    Todo.findByIdAndRemove({
        _id: req.params.id
    }, (err, todo) => {
        if (err) res.json(err);
        else res.json('Todo successfully removed');
    });
});

module.exports = router;
