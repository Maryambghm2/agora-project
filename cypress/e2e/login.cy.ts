describe("Authentification NextAuth avec Credentials", () => {
    beforeEach(() => {
      cy.visit("/login"); // Remplace par l'URL de ta page de connexion
    });
  
    it("Se connecte avec des identifiants valides", () => {
      cy.get("input[name='email']").type("test@example.com");
      cy.get("input[name='password']").type("password123");
      cy.get("button[type='submit']").click();
  
      // Vérifier la redirection après connexion
      cy.url().should("eq", "http://localhost:3000/articles");
  
      // Vérifier la présence du nom de l'utilisateur
      cy.contains("Bienvenue, test@example.com").should("be.visible");
    });
  
    it("Affiche une erreur avec des identifiants invalides", () => {
      cy.get("input[name='email']").type("wrong@example.com");
      cy.get("input[name='password']").type("wrongpassword");
      cy.get("button[type='submit']").click();
  
      // Vérifier l'affichage du message d'erreur
      cy.contains("Identifiants incorrects").should("be.visible");
    });
  });
  