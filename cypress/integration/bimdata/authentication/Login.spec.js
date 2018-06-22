describe('Login', function () {

  beforeEach(() => {
    cy.visit('localhost:8080/#/login')
  })

  it('Empty Password', function () {
    cy.get('#username-login')
      .type('testøtest.fr')
    cy.get('button[type="submit"]').click()
    cy.get('#inputFeedbackUsername').should('not.be.visible')
    cy.get('#inputFeedbackPassword').should('be.visible')
  })

  it('Empty Username', function () {
    cy.get('#password-login')
      .type('Ujmpv1937')
    cy.get('button[type="submit"]').click()
    cy.get('#inputFeedbackUsername').should('be.visible')
    cy.get('#inputFeedbackPassword').should('not.be.visible')
  })

  it('Bad credentials', function () {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/token',
        status: 401,
        response: { error: 'test' },
        delay: 500
      }
    ).as('getToken')

    cy.get('#username-login')
      .type('testøtest.fr')
    cy.get('#password-login')
      .type('Ujmpv1937')
    cy.get('button[type="submit"]').click()
    cy.get('#error-message-username').should('be.visible')
  })

  it('Success Login', function () {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/token',
        status: 200,
        response: 'fixture:authentication/getToken.json',
        delay: 500
      }
    ).as('getToken')

    cy.get('#username-login')
      .type('testøtest.fr')
    cy.get('#password-login')
      .type('Ujmpv1937')
    cy.get('button[type="submit"]').click()
    cy.wait('@getToken').then((xhr) => {
      cy.url().should('equal', 'http://localhost:8080/#/')
      expect(localStorage.getItem('token')).to.eq('test_token')
    })
  })
})