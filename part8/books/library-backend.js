const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')


mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const MONGODB_URI = 'mongodb+srv://rvp:fullstack2020@cluster0-eyt6f.mongodb.net/library?retryWrites=true&w=majority'


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = gql`

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
}`

const resolvers = {
	Query: {

		authorCount: async () => {
			return (await Author.find({}).then(result => result.length))
		},

		allBooks: async (root, args) => {

			console.log(args)
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

			else if(args.genre && args.author)
			{
				let foundAuthor = await Author.findOne({ name: args.author })
				let foundBooks = await Book.find({ author: foundAuthor.id })
				let filteredBooks = foundBooks.filter(book => book.genres.includes(args.genre))
				return filteredBooks	
			}

			else
			{
				let books = await Book.find({}).then(result => (result))
				return books
			}			
		},

		allAuthors: async () => {

			let authors = Author.find({})
			return authors

		}
	},

	Author:
	{
		bookCount: async root => {
			let foundAuthor = await Author.findOne({ name: root.name })
			let foundBooks = await Book.find({ author: foundAuthor.id })
			return (foundBooks.length)
		},
	},

	Book:
	{
		author: async root => {

			let foundAuthor = await Author.findById(root.author)
			return ({ name: foundAuthor.name, born: foundAuthor.born })
		}
	},

	Mutation:
	{
		addAuthor: async (root, args) => {
			const author = new Author({ ...args })

			await author.save()

			return author

		},
		addBook: async (root, args) => {

			let foundAuthor = await Author.findOne({ name: args.author })

			if (!foundAuthor) {
				let newAuthor = new Author({ name: args.author, born: null })

				await newAuthor.save()

				let newBook = new Book({
					title: args.title,
					author: newAuthor,
					published: args.published,
					genres: args.genres
				})

				await newBook.save()
				return newBook
			}

			else {
				let newBook = new Book({
					title: args.title,
					author: foundAuthor,
					published: args.published,
					genres: args.genres
				})

				await newBook.save()
				return newBook

			}




		},

		editAuthor: async (root, args) => {

			let foundAuthor = await Author.findOne({name : args.name})

			if (foundAuthor) {
				
				foundAuthor.born = args.setBornTo
				console.log(foundAuthor)
				await foundAuthor.save()
				return foundAuthor
			}

			return null

		}

	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})