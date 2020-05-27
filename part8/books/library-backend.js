const { ApolloServer, gql, UserInputError , AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const MONGODB_URI = 'mongodb+srv://rvp:fullstack2020@cluster0-eyt6f.mongodb.net/library?retryWrites=true&w=majority'
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = gql`
type User {
	username: String!
	favouriteGenre: String!
	id: ID!
  }

type Token {
	value: String!
}

type Book 
{
	title: String!
	published: Int!
	author: Author!
	genres: [String!]!
	id: ID!
  } 
type Author
{
	name: String!
	born: Int
	bookCount: Int!
	
}
type Query {
	bookCount: Int!
	authorCount: Int!
	allBooks (author: String genre: String): [Book!]!
	allAuthors: [Author]
	me : User
  }
type Mutation {
	addBook(
	  title: String!
	  author: String!
	  published: Int!
	  genres: [String!]!
	) : Book

	addAuthor(
		name: String!
		born: Int
	): Author
  
  editAuthor(
	name : String! 
	setBornTo : Int!
  ) : Author

  createUser(
	  username: String!
	  favouriteGenre: String!
  ): User

  login(
	  username: String!
	  password: String!
  ): Token
}

type Subscription {
	addBook: Book!
  }   
`

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
	Query: {

		authorCount: async () => {

			return (await Author.find({}).then(result => result.length))
		},

		allBooks: async (root, args) => {			

			if (args.author && !args.genre) {

				let foundAuthor = await Author.findOne({ name: args.author })
				let foundBooks = await Book.find({ author: foundAuthor.id })
				return foundBooks
			}


			else if (args.genre && !args.author) {

				let foundBooks = await Book.find({}).then(result => result)
				let filteredBooks = foundBooks.filter(book => book.genres.includes(args.genre))
				return filteredBooks
			}

			else if (args.genre && args.author) {

				let foundAuthor = await Author.findOne({ name: args.author })
				let foundBooks = await Book.find({ author: foundAuthor.id })
				let filteredBooks = foundBooks.filter(book => book.genres.includes(args.genre))
				return filteredBooks
			}

			else {

				let books = await Book.find({}).then(result => (result))
				return books
			}
		},

		allAuthors: async () => {

			let authors = await Author.find({})
			return authors

		},
		
		me : async (root, args, context) =>
		{
			return(context.currentUser)
		}

		
	},	

	Book:
	{
		author: async root => {

			let foundAuthor = await Author.findById(root.author)			
			return(foundAuthor)
		}
	},

	Mutation:
	{
		addAuthor: async (root, args) => {

			try {
				const author = new Author({ ...args , bookCount : 0 })
				await author.save()
				return author

			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}


		},
		addBook: async (root, args, context) => {

			if(!context.currentUser)
			{
				throw new AuthenticationError("Token not valid.")
			}

			try {

				let foundAuthor = await Author.findOne({ name: args.author })

				if (!foundAuthor) {
					let newAuthor = new Author({ name: args.author, born: null , bookCount : 1 })

					await newAuthor.save()

					let newBook = new Book({
						title: args.title,
						author: newAuthor,
						published: args.published,
						genres: args.genres
					})

					await newBook.save()
					pubsub.publish('BOOK_ADDED', { addBook: newBook })
					return newBook
				}

				else {

					foundAuthor.bookCount = foundAuthor.bookCount + 1 
					await foundAuthor.save()
					let newBook = new Book({
						title: args.title,
						author: foundAuthor,
						published: args.published,
						genres: args.genres
					})

					await newBook.save()
					pubsub.publish('BOOK_ADDED', { addBook: newBook })
					return newBook

				}

			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}



		},

		editAuthor: async (root, args, context) => {

			if(!context.currentUser)
			{
				throw new AuthenticationError("Token not valid.")
			}

			let foundAuthor = await Author.findOne({ name: args.name })

			if (foundAuthor) {

				foundAuthor.born = args.setBornTo
				await foundAuthor.save()
				return foundAuthor
			}

			return null

		},
		createUser: (root, args) => {
			const user = new User({ username: args.username , favouriteGenre : args.favouriteGenre})
		
			return user.save()
			  .catch(error => {
				throw new UserInputError(error.message, {
				  invalidArgs: args,
				})
			  })
		  }, 
		  login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
		
			if ( !user || args.password !== 'secret' ) {
			  throw new UserInputError("wrong credentials")
			}
		
			const userForToken = {
			  username: user.username,
			  id: user._id,
			}
		
			return { value: jwt.sign(userForToken, JWT_SECRET) }
		  }

	},

	Subscription: 
	{
		addBook: {
		  subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
	  const auth = req ? req.headers.authorization : null
	  if (auth && auth.toLowerCase().startsWith('bearer ')) {
		const decodedToken = jwt.verify(
		  auth.substring(7), JWT_SECRET
		)
  
		const currentUser = await User
		  .findById(decodedToken.id)
  
		return { currentUser }
	  }
	}  
  })
  
  server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`)
	console.log(`Subscriptions ready at ${subscriptionsUrl}`)
  })