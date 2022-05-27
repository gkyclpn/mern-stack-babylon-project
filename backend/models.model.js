const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Models = new Schema({
    model_name: {
        type: String
    },
    model_textures_length: {
        type: String
    },
});

module.exports = mongoose.model('Models', Models);