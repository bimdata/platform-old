describe('Reset password', function() {

  beforeEach(() => {
    cy.visit('localhost:8080/#/reset-password')
  })

  it('Had to be the same', function() {
    cy.get('#resetpassword-password')
      .type('a').should('have.value', 'a')
    cy.get('#resetpassword-password-confirmation')
      .type('b').should('have.value', 'b')
    cy.get('button[type="submit"]').click()
    cy.get('#inputPasswordConfirmationFeedback').should('be.visible')
  })

  it('Displays error when password is empty', function() {
    cy.get('button[type="submit"]').click()
    cy.get('#inputPasswordFeedback').should('be.visible')
    cy.get('#inputPasswordConfirmationFeedback').should('not.be.visible')
  })

  it('display error when token has expired', function() {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/reset-password',
        status: 400,
        response: {reset_token: ['This field is required.']},
        delay: 500
      }
    ).as('resetToken')
    cy.get('#resetpassword-password')
      .type('Ujmpv1937')
    cy.get('#resetpassword-password-confirmation')
      .type('Ujmpv1937')
    cy.get('button[type="submit"]').click()

    cy.wait('@resetToken').then((xhr) => {
      cy.get('#error-invalid-token').should('be.visible')
      cy.get('#error-server').should('not.be.visible')
    })
  })

  it('display error when server is done', function() {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/reset-password',
        status: 502,
        response: {},
        delay: 500
      }
    ).as('resetToken')
    cy.get('#resetpassword-password')
      .type('Ujmpv1937')
    cy.get('#resetpassword-password-confirmation')
      .type('Ujmpv1937')
    cy.get('button[type="submit"]').click()

    cy.wait('@resetToken').then((xhr) => {
      cy.get('#error-invalid-token').should('not.be.visible')
      cy.get('#error-server').should('be.visible')
    })
  })

  it('display success', function() {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/reset-password',
        status: 200,
        response: {},
        delay: 500
      }
    ).as('resetToken')
    cy.get('#resetpassword-password')
      .type('Ujmpv1937')
    cy.get('#resetpassword-password-confirmation')
      .type('Ujmpv1937')
    cy.get('button[type="submit"]').click()

    cy.wait('@resetToken').then((xhr) => {
      cy.get('#error-invalid-token').should('not.be.visible')
      cy.get('#error-server').should('not.be.visible')
      cy.get('#success-message-reset-password').should('be.visible')
    })
  })
})
