describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jesse Toivanen',
      username: 'toivane4',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('toivane4')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('logged in as Jesse Toivanen')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('feikki')
      cy.get('#password').type('julkinen')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('toivane4')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Test Engineering')
      cy.get('#author-input').type('Gerhard Berger')
      cy.get('#url-input').type('http://greatblogs.com/gberger/testing')
      cy.get('#create-button').click()
      cy.contains('Test Engineering')
    })
  })
})
