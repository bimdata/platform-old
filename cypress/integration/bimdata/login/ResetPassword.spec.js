describe('Reset password', function() {

  beforeEach(() => {
    cy.visit('localhost:8080/#/reset-password')
  })

  it('Confirmation password had to be the same', function() {
    cy.get('#resetpassword-password')
      .type('a').should('have.value', 'a')
    cy.get('#resetpassword-password-confirmation')
      .type('b').should('have.value', 'b')
    cy.get('button[type="submit"]').click()
    cy.get('#error').should('contain', 'same passwords needed')
  })
})
