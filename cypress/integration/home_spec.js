describe('Home page', function() {
  it('should able to add product into cart', function() {
    cy.visit('http://localhost:4000');
    cy.get('#nav-cart').should('contain', 'Cart: $0');

    cy.get('[data-product-id="product-1"] button').click();
    cy.get('#nav-cart').should('contain', 'Cart: $20');

    cy.get('[data-product-id="product-1"] button').click();
    cy.get('#nav-cart').should('contain', 'Cart: $40');

    cy.get('[data-product-id="product-3"] button').click();
    cy.get('#nav-cart').should('contain', 'Cart: $90');
  });
});
