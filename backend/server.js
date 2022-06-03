const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 4000;
const modelsRoutes = express.Router();

let Models = require('./models/models.model');


app.use(cors());
app.use(bodyParser.json());
app.use('/models', modelsRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

modelsRoutes.route('/').get(function(req, res) {
    Models.find(function(err, model) {
        if (err) {
            console.log(err);
        } else {
            res.json(model);
        }
    });
});

modelsRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Models.findById(id, function(err, model) {
        res.json(model);
    });
});

modelsRoutes.route('/add').post(function(req, res) {
    let model = new Models(req.body);
    model.save()
        .then(todo => {
            res.status(200).json({'model': 'model added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new model failed');
        });
});

app.use('/models', modelsRoutes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});