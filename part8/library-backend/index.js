require('dotenv').config()
const { ApolloServer, UserInputError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { authors, books } = require('./default_data.js')
const typeDefs = require('./typeDefs')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const DUMMYPASS = process.env.DUMMYPASS

const pubSub = new PubSub()

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

const resolvers = {
  Query: {
    bookCount: async () => (await Book.find({})).length,
    authorCount: async () => (await Author.find({})).length,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }
      const query = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        query.author = author ? author._id : null
      }
      if (args.genre) query.genres = { $in: [args.genre] }
      return await Book.find(query).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(a => {
        const bookCount = books.filter(b => b.author._id.equals(a._id)).length
        return { ...a.toObject(), bookCount }
      })
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('You are not authorized to complete this action.')
      }
      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const newBook = new Book({ ...args, author })
        pubSub.publish('BOOK_ADDED', { bookAdded: newBook })
        return await newBook.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('You are not authorized to complete this action.')
      }
      const updatedAuthor = await Author.findOne({ name: args.name })
      if (!updatedAuthor) {
        return null
      }
      updatedAuthor.born = args.setBornTo
      try {
        await updatedAuthor.save()
        return updatedAuthor
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        return await user.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== DUMMYPASS) {
        throw new UserInputError('Nonexistent user or wrong password!')
      }

      const uft = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(uft, JWT_SECRET) }
    }

  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (err) {
        return { currentUser: null }
      }
    }
  }
})

server.listen().then(({ url, subscriptionUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionUrl}`)
})