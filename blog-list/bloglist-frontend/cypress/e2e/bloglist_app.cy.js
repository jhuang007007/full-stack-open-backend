describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Johnny',
      username: 'jhuang',
      password: 'secret'
    }
    const otherUser = {
      name: 'notJohnny',
      username: 'notjhuang',
      password: 'notasecret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, otherUser)
    cy.visit('')
  })

  it('login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('jhuang')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Johnny logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('jhuang')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jhuang', password: 'secret' })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog title created by cypress')
      cy.get('#author').type('a blog author created by cypress')
      cy.get('#url').type('a blog url created by cypress')
      cy.contains('post').click()

      cy.contains('a blog title created by cypress')
    })

    describe('When there are several blogs', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'a blog title created by cypress',
          author: 'cypress',
          url: 'testing'
        })
        cy.createBlog({
          title: 'the second blog created by cypress',
          author: 'cypress',
          url: 'testing'
        })
        cy.login({ username: 'notjhuang', password: 'notasecret' })
        cy.createBlog({
          title: 'the third blog created by cypress',
          author: 'cypress',
          url: 'testing'
        })
      })

      it('the user who created a blog can delete it', function() {
        cy.contains('the third blog created by cypress').parent().contains('details').click()
        cy.contains('delete blog')
      })

      it('the delete button is only visible to the creator of the blog', function() {
        cy.contains('a blog title created by cypress').parent().contains('details').click()
        cy.contains('a blog title created by cypress').parent().should('not.contain', 'delete blog')

        cy.contains('the second blog created by cypress').parent().contains('details').click()
        cy.contains('the second blog created by cypress').parent().should('not.contain', 'delete blog')

        cy.contains('the third blog created by cypress').parent().contains('details').click()
        cy.contains('delete blog')
      })

      it('a user can like a blog', function() {
        cy.contains('a blog title created by cypress').parent().contains('details').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('blogs are ordered according to likes, with the blog with the most likes being first', function() {
        cy.contains('the second blog created by cypress').parent().contains('details').click()
        cy.wait(500)
        cy.contains('the second blog created by cypress').parent().contains('like').click()
        cy.wait(500)
        cy.contains('the second blog created by cypress').parent().contains('like').click()
        cy.wait(500)
        cy.contains('the second blog created by cypress').parent().contains('like').click()
        cy.wait(500)
        cy.contains('the third blog created by cypress').parent().contains('details').click()
        cy.wait(500)
        cy.contains('the third blog created by cypress').parent().contains('like').click()
        cy.wait(500)
        cy.get('.blog').eq(0).should('contain', 'the second blog created by cypress')
        cy.get('.blog').eq(1).should('contain', 'the third blog created by cypress')
      })
    })
  })
})
