const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')
//novamente importei o mongoose
//dev é a entidade que vou cadastrar no banco de dados... esses são o atributos dela

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], //vetor de string
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema);