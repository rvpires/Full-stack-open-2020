const listHelper = require('../utils/list_helper')


describe('total likes', () => {
	
	const listWithTwoBlogs = [{
		'title': 'Blog Entry Test1',
		'author': 'rvp',
		'url': 'www.example.com',
		'likes': 5
	},
	{
		'title': 'Blog Entry Test',
		'author': 'rvp',
		'url': 'www.example.com',
		'likes': 10
	}]

	const listWithOneBlogs = [{
		'title': 'Blog Entry Test1',
		'author': 'rvp',
		'url': 'www.example.com',
		'likes': 5
	}]


	test('adding all blog likes : two blogs', () => {		

		const result = listHelper.totalLikes(listWithTwoBlogs)
		expect(result).toBe(15)
	})

	test('adding all blog likes : one blog' , () => {		

		const result = listHelper.totalLikes(listWithOneBlogs)
		expect(result).toBe(5)
	})

	test('adding all blog likes when there is no blogs', () => {

		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})

	


})

describe('favourite blog' , () => {

	const listWithTwoBlogs = [{
		'title': 'Blog Entry Test1',
		'author': 'rvp',
		'url': 'www.example.com',
		'likes': 5
	},
	{
		'title': 'Blog Entry Test',
		'author': 'rvp',
		'url': 'www.example.com',
		'likes': 10
	}]

	const twoBlogsSameLikes = [{
		'title': 'Blog Entry Test1',
		'author': 'rvp',
		'url': 'www.example.com',
		'likes': 10
	},
	{
		'title': 'Blog Entry Test',
		'author': 'rvp',
		'url': 'www.example.com',
		'likes': 10
	}]



	test('two blogs : one favourite', () => {			

		const result = listHelper.favouriteBlog(listWithTwoBlogs)
		expect(result).toEqual({
			'title': 'Blog Entry Test',
			'author': 'rvp',
			'url': 'www.example.com',
			'likes': 10
		})
	})

	test('two blogs : same likes returns first', () => {			

		const result = listHelper.favouriteBlog(twoBlogsSameLikes)
		expect(result).toEqual({
			'title': 'Blog Entry Test1',
			'author': 'rvp',
			'url': 'www.example.com',
			'likes': 10
		})
	})

	test('empty blog list', () => {			

		const result = listHelper.favouriteBlog([])
		expect(result).toEqual(undefined)
	})


})

describe('most published author' , () => {

	const list = [
		{
			'title': 'Blog Entry Test1',
			'author': 'rvp',
			'url': 'www.example.com',
			'likes': 10
		},
		{
			'title': 'Blog Entry Test',
			'author': 'rvp',
			'url': 'www.example.com',
			'likes': 10
		},
		{
			'title': 'Blog Entry Test',
			'author': 'rvpp',
			'url': 'www.example.com',
			'likes': 1
		}]

	const twoBlogs = [
		{
			'title': 'Blog Entry Test1',
			'author': 'rvp',
			'url': 'www.example.com',
			'likes': 10
		},
		{
			'title': 'Blog Entry Test',
			'author': 'rvpp',
			'url': 'www.example.com',
			'likes': 10
		}]

	test('3 blogs two authors', () => {			

		const result = listHelper.mostBlogs(list)
		expect(result).toEqual({'author': 'rvp', 'blogs': 2})
	})

	test('two blogs two authors', () => {			

		const result = listHelper.mostBlogs(twoBlogs)
		expect(result).toEqual({'author': 'rvp', 'blogs': 1})
	})

})

describe('author with more likes' , () => {

	const list1 = [
		{
			'title': 'Blog Entry Test1',
			'author': 'rvp',
			'url': 'www.example.com',
			'likes': 10
		},
		{
			'title': 'Blog Entry Test',
			'author': 'rvp',
			'url': 'www.example.com',
			'likes': 10
		},
		{
			'title': 'Blog Entry Test',
			'author': 'rvpp',
			'url': 'www.example.com',
			'likes': 1
		},
		{
			'title': 'Blog Entry Test',
			'author': 'rvpp',
			'url': 'www.example.com',
			'likes': 5
		}
	]

	const list2 = [
		{
			'title': 'Blog Entry Test1',
			'author': 'rvp',
			'url': 'www.example.com',
			'likes': 10
		},
		{
			'title': 'Blog Entry Test',
			'author': 'rvpp',
			'url': 'www.example.com',
			'likes': 10
		}
	]

	test('4 blogs two authors', () => {			

		const result = listHelper.mostLikes(list1)
		expect(result).toEqual({'author': 'rvp', 'likes': 20})
	})	
	
	test('2 blogs two authors same likes', () => {			

		const result = listHelper.mostLikes(list2)
		expect(result).toEqual({'author': 'rvp', 'likes': 10})
	})



})


