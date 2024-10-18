describe('Home Page', () => {
  it('Does Website Title exist', () => {
    cy.visit('/');
    cy.get('h2').should('exist');
    cy.get('h2').contains('Trending Cards');
  })

})
describe('Login Page', () => {
  it('Check Login Success', () => {
    cy.visit('/admin/login');
    cy.get('[data-test="email"]').type('narendrapanchal020@gmail.com');
    cy.get('[data-test="password"]').type('123456');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="logout"]').should('exist');
    cy.get('[data-test="add-card"]').should('exist');
    cy.get('[data-test="applications"]').should('exist');
  })
  
})
describe('Edit page Testing', () => {
  it('Edit Page', () => {
    cy.visit('/admin/login');
    cy.get('[data-test="email"]').type('narendrapanchal020@gmail.com');
    cy.get('[data-test="password"]').type('123456');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="Edit 1"]').should('exist');
    cy.get('[data-test="Read More 1"]').should('exist');
    cy.get('[data-test="Delete 1"]').should('exist');
    cy.get('[data-test="Edit 1"]').click();
    cy.get('[data-test="edit-form"]').should('exist');
    cy.get('[data-test="edit-name"]').should('exist');
    cy.get('[data-test="edit-src"]').should('exist');
    cy.get('[data-test="edit-limit"]').should('exist');
    cy.get('[data-test="edit-category"]').should('exist');
    cy.get('[data-test="edit-bank"]').should('exist');
    cy.get('[data-test="edit-submit"]').should('exist');
  })
})

describe('Read More', () => {
  it('User Page', () => {
    cy.visit('/');
    cy.get('[data-test="Read More 1"]').should('exist');
    cy.get('[data-test="Read More 1"]').click(  );
    cy.get('[data-test="card-name"]').should('exist');
    cy.get('[data-test="card-limit"]').should('exist');
    cy.get('[data-test="card-category"]').should('exist');
    cy.get('[data-test="card-bank"]').should('exist');
    cy.get('[data-test="apply-now"]').click();
  })
})

describe('Apply to card', () => {
  it('User Page', () => {
    cy.visit('/');
    cy.get('[data-test="Read More 1"]').click();
    cy.get('[data-test="apply-now"]').click();
    cy.get('[data-test="applicant-name"]').type("Narendra Panchal");
    cy.get('[data-test="applicant-income"]').type(20000);
    cy.get('[data-test="applicant-email"]').type("narendrapanchal020@gmail.com");
    cy.get('[data-test="applicant-phone"]').type(9899876556);
    cy.get('[data-test="applicant-aadhar"]').type(890987678738);
    cy.get('[data-test="applicant-pancard"]').type("AJKSP8989G");
    cy.get('[data-test="applicant-address"]').type("Civil lines Jaipur Rajasthan");
    cy.get('[data-test="applicant-pincode"]').type(302006);
    cy.get('[data-test="applicant-submit"]').click();
    cy.get('[data-test="application-message"]').should("exist");
  })
})

describe('Approve Application', () => {
  it('Applications List', () => {
    cy.visit('/admin/login');
    cy.get('[data-test="email"]').type('narendrapanchal020@gmail.com');
    cy.get('[data-test="password"]').type('123456');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="applications"]').click();
    cy.get('[data-test="edit-link 1"]').should('exist');
    cy.get('[data-test="edit-link 1"]').click();
    cy.get('[data-test="application-approve"]').click();
    
  })
})
