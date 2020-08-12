const mongoose = require('mongoose')

const atlas_url = process.env.MONGODB_URI
console.log(`Connecting to ${atlas_url}`);
mongoose.connect(atlas_url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        console.log('connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err.message);
    })

const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)