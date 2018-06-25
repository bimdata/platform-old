describe('Forgot password', function () {

  beforeEach(() => {
    cy.visit('localhost:8080/#/forgot-password')
  })

  it('Displays an error if email is empty', function () {
    cy.get('button[type="submit"]').click()
    cy.get('#inputUsernameFeedback').should('be.visible')
  })

  it('Displays an error if account already exist', function () {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/forgot-password',
        status: 502,
        response: {},
        delay: 500
      }
    ).as('askForgotPassword')

    cy.get('#forgotpassword-username')
      .type('test@test.fr')
    cy.get('button[type="submit"]').click()

    cy.wait('@askForgotPassword').then((xhr) => {
      cy.get('#error-message-forgot-password').should('be.visible')
    })
  })

  it('Displays success', function () {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/forgot-password',
        status: 200,
        response: {},
        delay: 500
      }
    ).as('askForgotPassword')

    cy.get('#forgotpassword-username')
      .type('test@test.fr')
    cy.get('button[type="submit"]').click()

    cy.wait('@askForgotPassword').then((xhr) => {
      cy.get('#success-message-forgot-password').should('be.visible')
    })
  })
})