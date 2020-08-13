const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)

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
        name: {
            type: String,
            minlength: 3,
            required: true,
            unique: true
        },
        number: {
            type: String,
            validate: {
                validator: (v) => {
                    return /^\d{3}(-?| ?)\d{3}(-?| ?)\d{2,}$/.test(v)
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: true
        }
    })

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)