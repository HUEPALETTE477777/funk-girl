const mongoose = require('mongoose')

const girlSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    coverImage: {
        data: Buffer, 
        contentType: String, 
    },

    uploadTime: {
        type: Date,
        default: Date.now
    }

})

const Girl = mongoose.model("Girl", girlSchema)
module.exports = Girl;