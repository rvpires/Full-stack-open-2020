describe('Note app', function () {

	beforeEach(function () {

		cy.request('POST', 'http://localhost:3001/api/testing/reset')

		let newUser = {
			"username": "admin",
			"name": "rvp",
			"password": "admin"
		}


		cy.request('POST', 'http://localhost:3001/api/users/', newUser)
		
		newUser = {
			"username": "admin1",
			"name": "pvr",
			"password": "admin1"
		}

		cy.request('POST', 'http://localhost:3001/api/users/', newUser)

		cy.visit('http://localhost:3000')

	})


	describe('When you are in the login page', function () {

		it('show the login form', function () {
			cy.contains('login')
			cy.contains('username')
			cy.contains('password')
		})

		it('succeeds with correct credentials', function () {
			cy.get('#username').type('admin')
			cy.get('#password').type('admin')
			cy.get('#login-button').click()
			cy.contains('admin logged in')

		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('wrongadmin')
			cy.get('#password').type('wrongpassword')
			cy.get('#login-button').click()
			cy.get('.error').contains('Credentials are wrong')

		})

	})


	describe('when logged in', function () {

		beforeEach(function () {

			cy.login({username : 'admin' , password : 'admin'})
			cy.createBlog({title : 'aeiou' , author: 'rvp' , url: 'www.example.com' , likes: 0})
		
		})

		it('a new blog can be added', function () {

			cy.contains('add new blog').click()
			cy.get('#title').type('Example Title')
			cy.get('#author').type('Example Author')
			cy.get('#url').type('Example Url')
			cy.get('#submitBlog').click()
			cy.get('.success').contains('New blog Example Title by Example Author was created successfuly.')
			
		})

		it('can like the added blog' , function () {

			cy.contains('view').click()
			cy.contains('like').click()
		})

		it('can delete the added blog' , function () {

			cy.contains('view').click()
			cy.contains('delete').click()
			cy.get('.success').contains('aeiou by rvp was deleted successfuly.')
		})

		it('a different user blog cannot be deleted', function () {
			
			cy.login({username : 'admin1' , password : 'admin1'})
			cy.contains('view').click()
			cy.get('delete').should('not.exist')
		})

		it('orders blogs from likes', function () {

			cy.createBlog({title : 'blog1' , author: 'ath1' , url: 'www.example.com' , likes: 10})
			cy.createBlog({title : 'blog2' , author: 'ath2' , url: 'www.example.com' , likes: 5})
			cy.createBlog({title : 'blog3' , author: 'ath3' , url: 'www.example.com' , likes: 15})

			
			cy.get('.Blog').then(response => {

				cy.wrap(response[0]).contains('blog3')
				cy.wrap(response[1]).contains('blog1')
				cy.wrap(response[2]).contains('blog2')
				cy.wrap(response[3]).contains('aeiou')

			})

			
		})

	})
})