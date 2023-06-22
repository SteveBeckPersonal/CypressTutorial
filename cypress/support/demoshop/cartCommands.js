Cypress.Commands.add(`clearCart`, () => {
    cy.get('.order-summary-content').then(($el) => {
        if(!$el.text().includes(`Your Shopping Cart is empty`)){
            cy.get('.remove-from-cart > input').click();
            cy.get('.update-cart-button').click();
        }
    });
})