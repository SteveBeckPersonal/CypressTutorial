Cypress.Commands.add('login', (email, password) => {
    login(email,password);
})

Cypress.Commands.add(`sessionLogin`, (email, password, userType)=> {
    cy.session(userType, () => {
        login(email,password);
    })
})



function login(email,password){
    cy.visit(`/`);
    cy.get('.ico-login').click();
    cy.get('#Email').type(email);
    cy.get('#Password').type(password);
    cy.get('form > .buttons > .button-1').click();
    cy.get('.header-links > ul > :nth-child(1) > .account').should(`have.text`,email);
}
Cypress.Commands.add('logout', () => {
    cy.get('.ico-logout').click();
    cy.get('.ico-register').should(`be.visible`);
})