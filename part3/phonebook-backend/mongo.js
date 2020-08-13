const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Must supply password!')
  process.exit(1)
}

const atlas_pw = process.argv[2]
const db_name = 'phonebook_db'

const atlas_url = `mongodb+srv://fullstack-jk:${atlas_pw}@cluster0-qhlpw.mongodb.net/${db_name}?retryWrites=true&w=majority`

mongoose.connect(atlas_url, { useNewUrlParser: true, useUnifiedTopology: true }).catch(e => {
  console.log(e)
  console.log('Error connecting to database, exiting...')
  process.exit(1)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(res => {
    console.log(`Added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid number of arguments, exiting...')
  mongoose.connection.close()
  process.exit(1)
}

