require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Author = require('./models/author')
const Book = require('./models/book')
const { authors, books } = require('./default_data.js')

const MONGODB_URI = process.env.MONGODB_URI

console.log(`Connecting to ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('MongoDB connection established')
    if (process.argv[2] === 'seed') {
      reseed()
    }
  }).catch(err => {
    console.log('Failed to establish MongoDB connection: ', error.message)
  })

const reseed = async () => {
  console.log('Reseeding database...')
  await Author.remove({})
  await Book.remove({})
  authors.forEach(async a => {
    const author = new Author({ name: a.name, born: a.born ? a.born : null })
    await author.save()
    books.filter(b => b.author === author.name).forEach(async b => {
      const book = new Book({ ...b, author })
      await book.save()
    })
  })
  console.log('Done seeding.')
}

const typeDefs = gql`
  type Author {
    _id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
  
  type Book {
    _id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({}).populate('author')
        return books
      }
      const filteredBooks = await Book.find({}).populate('author')
        .filter(b => args.author ? b.author === args.author : b)
        .filter(b => args.genre ? b.genres.includes(args.genre) : b)
      return filteredBooks
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(a => {
        const bookCount = books.filter(b => b.author.equals(a)).length
        console.log('a is')
        console.log(a)
        return { ...a, bookCount }
      })
    } 
    // authors.map(a => {
    //   const bookCount = books.filter(b => b.author === a.name).length
    //   return { ...a, bookCount }
    // })
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const newBook = new Book({ ...args, author })
        return await newBook.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: (root, args) => {
      const updatedAuthor = authors.find(a => a.name === args.name)
      if (!updatedAuthor) {
        return null
      }
      updatedAuthor.born = args.setBornTo
      authors = authors.map(a => a.id === updatedAuthor.id ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})