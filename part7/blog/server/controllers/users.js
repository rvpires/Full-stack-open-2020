const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
	const body = request.body

	const saltRounds = 10
	const passwordMinLength = 3

	if (body.password.length >= passwordMinLength) {
		const passwordHash = await bcrypt.hash(body.password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		})

		const savedUser = await user.save()
		response.json(savedUser)
	}

	else {
		let errorMessage = { 'error': `Username (${body.username}) is shorter than the minimum allowed length (${passwordMinLength}).` }
		response.status(400).json(errorMessage)
	}
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { likes: 1, title: 1, author: 1, url: 1, id: 1})
	response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter