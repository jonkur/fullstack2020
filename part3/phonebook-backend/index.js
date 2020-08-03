const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('postinfo', function (req, res) {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postinfo'))

let persons = [
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 1
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 2
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 3
    }
]

app.get('/', (req, res) => {
    res.send('Hello').end()
})

app.get('/info', (req, res) => {
    const receiveTime = new Date()
    const personParag = `<p>There are ${persons.length} persons listed in the phonebooks</p>`
    const dateParag = `<p>This info request wes received at ${receiveTime}</p>`
    res.send(`<div>${personParag}${dateParag}</div>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (!person) {
        return res.status(404).end()
    } else {
        return res.json(person)
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || ! body.number) {
        return res.status(400).json({
            error: "Name and number must be supplied."
        })
    }
    if (persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())) {
        return res.status(400).json({
            error: "Name already exists in phonebook."
        })
    }

    const randId = Math.floor(Math.random() * 1000000000)
    const person = {id: randId,
                    name: body.name,
                    number: body.number
                   }
    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    return res.status(204).end()
})

PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})