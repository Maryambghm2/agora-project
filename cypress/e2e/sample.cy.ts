describe("Test de Cypress", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("Vérifie que la page d'accueil s'affiche", () => {
      cy.contains("Bienvenue").should("be.visible");
    });
  });
  