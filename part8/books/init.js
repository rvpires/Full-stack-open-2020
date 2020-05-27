const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
const MONGODB_URI = 'mongodb+srv://rvp:fullstack2020@cluster0-eyt6f.mongodb.net/library?retryWrites=true&w=majority'

let authors = [
	{
		name: 'Robert Martin',
		born: 1952,
		bookCount : 0
	},
	{
		name: 'Martin Fowler',
		born: 1963,
		bookCount : 0
	},
	{
		name: 'Fyodor Dostoevsky',
		born: 1821,
		bookCount : 0
	},
	{
		name: 'Joshua Kerievsky',
		born: null,
		bookCount : 0
	},
	{
		name: 'Sandi Metz',
		born: null,
		bookCount : 0
	},
]

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		genres: ['classic', 'revolution']
	},
]

let users = [
	{
		username: 'user1',
		favouriteGenre: 'refactoring'
	},
	{
		username: 'user2',
		favouriteGenre: 'patterns'
	},
	{
		username: 'user3',
		favouriteGenre: 'classic'
	}
]


mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const main = async () => {
	let foundAuthor = await Author.deleteMany({})
	let foundBooks = await Book.deleteMany({})
	let foundUsers = await User.deleteMany({})
	console.log('cleaned up')


	for (let i = 0; i < users.length; i++) {
		let newUser = new User(users[i])
		await newUser.save()
	}

	for (let j = 0; j < authors.length; j++) {
		let newAuthor = new Author(authors[j])
		await newAuthor.save()
	}

	for (let k = 0; k < books.length; k++) {
		
		let foundAuthor = await Author.findOne({ name: books[k].author })

		foundAuthor.bookCount = foundAuthor.bookCount + 1
		await foundAuthor.save()
		
		let newBook = new Book({
				title: books[k].title,
				author: foundAuthor,
				published: books[k].published,
				genres: books[k].genres
			})

			await newBook.save()
	}
	




	console.log('done')

	return(0)

}


main()