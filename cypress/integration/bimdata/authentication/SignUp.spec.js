describe('Sign Up', function () {

  beforeEach(() => {
    cy.visit('localhost:8080/#/signup')
  })

  it('Displays an error if email is empty', function () {
    cy.get('#signup-password')
      .type('Ujmpv1937')
    cy.get('#signup-password-confirmation')
      .type('Ujmpv1937')
    cy.get('#signup-firstname')
      .type('John')
    cy.get('#signup-lastname')
      .type('Doe')

    cy.get('button[type="submit"]').click()
    cy.get('#inputUsernameLoginFeedback').should('be.visible')
    cy.get('#inputPasswordLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordConfirmationLoginFeedback').should('not.be.visible')
    cy.get('#inputFirstnameLoginFeedback').should('not.be.visible')
    cy.get('#inputLastnameLoginFeedback').should('not.be.visible')
  })

  it('Displays an error if password is empty', function () {
    cy.get('#signup-username')
      .type('test@test.fr')
    cy.get('#signup-firstname')
      .type('John')
    cy.get('#signup-lastname')
      .type('Doe')

    cy.get('button[type="submit"]').click()
    cy.get('#inputUsernameLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordLoginFeedback').should('be.visible')
    cy.get('#inputPasswordConfirmationLoginFeedback').should('not.be.visible')
    cy.get('#inputFirstnameLoginFeedback').should('not.be.visible')
    cy.get('#inputLastnameLoginFeedback').should('not.be.visible')
  })

  it('Displays an error if password confirmation is empty', function () {
    cy.get('#signup-username')
      .type('test@test.fr')
    cy.get('#signup-password')
      .type('Ujmpv1937')

    cy.get('#signup-firstname')
      .type('John')
    cy.get('#signup-lastname')
      .type('Doe')

    cy.get('button[type="submit"]').click()
    cy.get('#inputUsernameLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordConfirmationLoginFeedback').should('be.visible')
    cy.get('#inputFirstnameLoginFeedback').should('not.be.visible')
    cy.get('#inputLastnameLoginFeedback').should('not.be.visible')
  })

  it('Displays an error if firstname is empty', function () {
    cy.get('#signup-username')
      .type('test@test.fr')
    cy.get('#signup-password')
      .type('Ujmpv1937')
    cy.get('#signup-password-confirmation')
      .type('Ujmpv1937')
    cy.get('#signup-lastname')
      .type('Doe')

    cy.get('button[type="submit"]').click()
    cy.get('#inputUsernameLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordConfirmationLoginFeedback').should('not.be.visible')
    cy.get('#inputFirstnameLoginFeedback').should('be.visible')
    cy.get('#inputLastnameLoginFeedback').should('not.be.visible')
  })

  it('Displays an error if firstname is empty', function () {
    cy.get('#signup-username')
      .type('test@test.fr')
    cy.get('#signup-password')
      .type('Ujmpv1937')
    cy.get('#signup-password-confirmation')
      .type('Ujmpv1937')
    cy.get('#signup-lastname')
      .type('Doe')

    cy.get('button[type="submit"]').click()
    cy.get('#inputUsernameLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordConfirmationLoginFeedback').should('not.be.visible')
    cy.get('#inputFirstnameLoginFeedback').should('be.visible')
    cy.get('#inputLastnameLoginFeedback').should('not.be.visible')
  })

  it('Displays an error if lastname is empty', function () {
    cy.get('#signup-username')
      .type('test@test.fr')
    cy.get('#signup-password')
      .type('Ujmpv1937')
    cy.get('#signup-password-confirmation')
      .type('Ujmpv1937')
    cy.get('#signup-firstname')
      .type('John')

    cy.get('button[type="submit"]').click()
    cy.get('#inputUsernameLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordConfirmationLoginFeedback').should('not.be.visible')
    cy.get('#inputFirstnameLoginFeedback').should('not.be.visible')
    cy.get('#inputLastnameLoginFeedback').should('be.visible')
  })

  it('Displays an error if paswords aren\'t the same', function () {
    cy.get('#signup-username')
      .type('test@test.fr')
    cy.get('#signup-password')
      .type('Ujmpv1937')
    cy.get('#signup-password-confirmation')
      .type('Ujmpv1938')
    cy.get('#signup-firstname')
      .type('John')
    cy.get('#signup-lastname')
      .type('Doe')

    cy.get('button[type="submit"]').click()
    cy.get('#inputUsernameLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordLoginFeedback').should('not.be.visible')
    cy.get('#inputPasswordConfirmationLoginFeedback').should('be.visible')
    cy.get('#inputFirstnameLoginFeedback').should('not.be.visible')
    cy.get('#inputLastnameLoginFeedback').should('not.be.visible')
  })

  it('Displays an error if account already exist', function () {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/signup',
        status: 400,
        response: { email: ['This user already exists'] },
        delay: 500
      }
    ).as('signUp')

    cy.get('#signup-username')
      .type('test@test.fr')
    cy.get('#signup-password')
      .type('Ujmpv1937')
    cy.get('#signup-password-confirmation')
      .type('Ujmpv1937')
    cy.get('#signup-firstname')
      .type('John')
    cy.get('#signup-lastname')
      .type('Doe')

    cy.get('button[type="submit"]').click()

    cy.wait('@signUp').then((xhr) => {
      cy.get('#error-already-account').should('be.visible')
    })
  })

  it('Displays an error if account already exist', function () {
    cy.server()
    cy.route(
      {
        method: 'POST',
        url: '**/signup',
        status: 502,
        response: {},
        delay: 500
      }
    ).as('signUp')

    cy.get('#signup-username')
      .type('test@test.fr')
    cy.get('#signup-password')
      .type('Ujmpv1937')
    cy.get('#signup-password-confirmation')
      .type('Ujmpv1937')
    cy.get('#signup-firstname')
      .type('John')
    cy.get('#signup-lastname')
      .type('Doe')

    cy.get('button[type="submit"]').click()

    cy.wait('@signUp').then((xhr) => {
      cy.get('#error-already-account').should('not.be.visible')
      cy.get('#error-server').should('be.visible')
    })
  })
})