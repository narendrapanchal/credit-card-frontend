describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
    cy.get('h2').should('exist');
    cy.get('h2').contains('Trending Cards');

  })
})