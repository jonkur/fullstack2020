
describe('Bloglist app', function () {

  const testCreds = {
    username: 'testuser',
    password: 'secretpass'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = testCreds
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    it('succeed with correct credentials', function () {
      cy.get('#login-username').type(testCreds.username)
      cy.get('#login-password').type(testCreds.password)
      cy.get('#login-submit').click()

      cy.contains(`Logged in as ${testCreds.username}`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-username').type(testCreds.username + 'asd')
      cy.get('#login-password').type(testCreds.password)
      cy.get('#login-submit').click()

      cy.contains('Invalid username or password')
    })
  })



  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ ...testCreds })
    })

    it('a new blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#newBlogTitle').type('Test title for a test blog')
      cy.get('#newBlogAuthor').type('Test author name')
      cy.get('#newBlogUrl').type('Test url for test blog')
      cy.get('#newBlogSubmit').click()
      cy.get('.blog').contains('Test title for a test blog')
      cy.get('.blog').contains('Test author name')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'test blog',
          author: 'test author',
          url: 'test url'
        })
      })

      it('clicking the like button of the blog increases it\'s likes by one', function() {
        cy.get('.viewBlogButton').click()
        cy.get('.blog').contains('Likes: 0')
        cy.get('.likeButton').click()
        cy.get('.blog').contains('Likes: 1')
      })

      it('can be deleted by the user who created it', function() {
        cy.get('.deleteBlogButton').click()
        cy.contains('Blog entry deleted')
        cy.get('.blog').should('not.exist')
      })

      it('can not be deleted by user who did not create it', function() {
        cy.get('.logoutButton').click()
        cy.request('POST', 'http://localhost:3001/api/users', { username: 'testuser2', password: 'testpass' })
        cy.login({ username: 'testuser2', password: 'testpass' })
        cy.get('.deleteBlogButton').should('not.exist')
      })

    })

    describe('several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'blog1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'blog2', author: 'author2', url: 'url2' })
        cy.createBlog({ title: 'blog3', author: 'author3', url: 'url3' })
      })

      it('they are ordered so that the most liked ones are at the top', function() {
        cy.contains('blog3').find('.viewBlogButton').click()
        cy.contains('blog3').parent().find('.likeButton').as('blog3like')
        cy.get('@blog3like').click()
        cy.wait(250) // seems to click second like too fast otherwise
        cy.get('@blog3like').click()
        cy.contains('blog2').find('.viewBlogButton').click()
        cy.contains('blog2').parent().find('.likeButton').as('blog2like')
        cy.get('@blog2like').click()
        cy.wait(250)

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('Likes: 2')
          cy.wrap(blogs[1]).contains('Likes: 1')
          cy.wrap(blogs[2]).find('.viewBlogButton').click()
          cy.wrap(blogs[2]).contains('Likes: 0')
        })
      })

    })

  })

})