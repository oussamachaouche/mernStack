const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        default: Date.now
    },
    reminder :{
        type: Boolean,
        required: true
    }
});
module.exports = mongoose.model('Posts', PostSchema);