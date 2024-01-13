describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Abdelghani JA',
      username: 'abdelghani',
      password: 'clearpwd'
    }
    const user2 = {
      name: 'Ayoub Doe',
      username: 'ayoub',
      password: 'clearpwd'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  // Make a test for checking that the application displays the login form by default.
  it('Login Form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.get('button').should('contain', 'login')
  })

  //Make tests for logging in. Test both successful and unsuccessful login attempts.

  describe('login to the app', function () {

    it('successful login attempt', function() {
      cy.get('#username').type('abdelghani')
      cy.get('#password').type('clearpwd')
      cy.get('#login-button').click()
      cy.contains('Abdelghani JA logged in')
    })

    it('unsuccessful login attempt', function() {
      cy.get('#username').type('abdelghani')
      cy.get('#password').type('notTheRightPWD')
      cy.get('#login-button').click()
      cy.get('#notification').should('contain', 'invalid username or password')
      cy.get('#notification').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })

  // logged-in user can create a new blog, The test has to ensure that a new blog is added to the list of all blogs.
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('abdelghani')
      cy.get('#password').type('clearpwd')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.newBlog('blog created by Cypress')
    })
    //Make a test that confirms users can like a blog
    describe('Interacting with blogs', function () {
      beforeEach(function() {
        cy.newBlog('The blog with the lowest likes')
      })

      it('user can like a blog', function () {
        cy.get('#view').click()
        cy.get('#like').click()
        cy.contains('likes').should('contain', 'likes : 1')
      })

      it('user can delete a blog', function () {
        cy.get('#view').click()
        cy.get('#delete').click()
        cy.contains('blog created by Cypress').should('not.exist')
      })

      //Make a test that checks that the blogs are ordered according to likes with the blog with the most likes being first.
      it('Blogs are ordered according to likes , from the highest to the lowest', function () {
        cy.newBlog('The blog with the second most likes')
        cy.newBlog('The blog with the most likes')

        cy.get('.blogGlance').eq(2).then(blog => {
          cy.wrap(blog).find('#view').click()
          cy.wrap(blog).find('#like').click()
          cy.wrap(blog).contains('likes : 1')
          cy.wrap(blog).find('#like').click()
          cy.wrap(blog).contains('likes : 2')
          cy.wrap(blog).find('#like').click()
          cy.wrap(blog).contains('likes : 3')
        })
        cy.get('.blogGlance').eq(1).then(blog => {
          cy.wrap(blog).find('#view').click()
          cy.wrap(blog).find('#like').click()
          cy.wrap(blog).contains('likes : 1')
          cy.wrap(blog).find('#like').click()
          cy.wrap(blog).contains('likes : 2')
        })
        cy.get('.blogGlance').eq(0).then(blog => {
          cy.wrap(blog).find('#view').click()
          cy.wrap(blog).find('#like').click()
          cy.wrap(blog).contains('likes : 1')
        })
        cy.reload()
        cy.get('.blogGlance').eq(0).should('contain', 'The blog with the most likes')
        cy.get('.blogGlance').eq(2).should('contain', 'The blog with the lowest likes')
      })
    })

    //Make a test for ensuring that only the creator can see the delete button of a blog, not anyone else.
    it('only the creator can see the delete button of a blog', function () {
      cy.newBlog('blog created by Abdelghani')
      cy.get('#logout').click()
      cy.get('#username').type('ayoub')
      cy.get('#password').type('clearpwd')
      cy.get('#login-button').click()
      cy.get('#view').click()
      cy.get('#delete').should('not.exist')
    })

  })
})