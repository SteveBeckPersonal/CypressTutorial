import items from '../../fixtures/items.json';

describe(`A collection of first cypress tests`, () => {
       
    before(`Cleanup`, () => {
        cy.log(`Email: ${process.env.email}`);
        cy.sessionLogin(process.env.email, process.env.password, `admin`);
        cy.visit(`/cart`);      
        
        cy.clearCart();
        cy.logout(); 
    })

    beforeEach(`Login`, () => {
        cy.sessionLogin(process.env.email, process.env.password, `admin`);
    })

    afterEach(`Remove items from cart`, () => {
        cy.visit(`/cart`);      
        cy.visit(`/cart`);
       cy.clearCart();
    })

    after(`Logout`, () => {
        cy.logout(); 
    })

    items.forEach((item) => {
        it(`Purchase ${item.quantity}x ${item.productName}`, () => {
            cy.visit(`/${item.productSection}`);
            cy.contains(item.productName).click({force:true});
            cy.get('label').contains(`${item.options.hardrive}`).prev('input').check();
            cy.get('.qty-input').clear().type(item.quantity);
            cy.get('.product-essential').find(`[value='Add to cart']`).click();
            cy.get(`p`).contains(`The product has been added to your `).should(`be.visible`);
            cy.visit(`/cart`);
            cy.get('.product-name').should(`be.visible`);
            cy.get('.qty-input').should(`have.value`,item.quantity);
        })
    })
})