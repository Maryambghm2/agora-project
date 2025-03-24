// declare namespace Cypress {
//     interface Chainable {
//       login(user?: {  mail: string, password: string }): void;
//     }
//   }
  
  declare namespace Cypress {
    interface Chainable {
      mockSession(user?: {  username: string,mail: string, token: any }): void;
    }
  }

Cypress.Commands.add("mockSession", (user) => {
    cy.intercept("GET", "api/auth/session", {
        statusCode: 200,
        body: user
            ? {
                user: {
                    username: user.username,
                    mail: user.mail,
                    token: user.token
                },
                expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
            }
            : {},
    });
});

// Cypress.Commands.add("login", (user) => {
//     cy.request({
//         method: "POST",
//         url: "/api/auth/callback/credentials",
//         body: {
//             mail:user?.mail,
//             password: user?.password,
//             redirect: false
//         }
//     }).then((res) => {
//         console.log("Token reçu :", res.body.token);
//         expect(res.status).to.eq(200);
//         expect(res.body.token).to.exist;
//         cy.setCookie("next-auth.session-token", res.body.token); // Stocke le token dans les cookies
//     });
// });
