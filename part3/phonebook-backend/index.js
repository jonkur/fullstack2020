require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const { response } = require('express')

app.use(express.json())
morgan.token('postinfo', function (req, res) {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postinfo'))
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('Hello').end()
})

app.get('/info', (req, res, next) => {
    const receiveTime = new Date()
    Person.find({}).then(persons => {
        const personsCount = persons.length
        const personParag = `<p>There are ${personsCount} persons listed in the phonebooks</p>`
        const dateParag = `<p>This info request wes received at ${receiveTime}</p>`
        res.send(`<div>${personParag}${dateParag}</div>`)
    }).catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        return res.json(persons)
    }).catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (!person) {
            return res.status(404).end()
        } else {
            return res.json(person)
        }
    }).catch(err => {
        next(err)
    })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if (!body.name || ! body.number) {
        return res.status(400).json({
            error: "Name and number must be supplied."
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        console.log(`Saved ${savedPerson.name} with number ${savedPerson.number} to phonebook.`);
        res.json(savedPerson)
    }).catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }
    
    Person.findByIdAndUpdate(req.params.id, person, { new: true }).then(updatedPerson => {
        res.json(updatedPerson)
    }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, err) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        return res.status(204).end()
    }).catch(err => next(err))
})


// Error handler mw
const errorHandler = (err, req, res, next) => {    
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'Malformed ID!' })
    }
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})