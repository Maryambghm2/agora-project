

// Extend Cypress commands for authentication

 declare namespace Cypress {
    interface Chainable {
      login(email: string, password: string): void;
    }
  }


// Custom command for login
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/front/login")
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should("include", "/front/articles")
})
