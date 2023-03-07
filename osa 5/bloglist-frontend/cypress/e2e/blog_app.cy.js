describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Joni Vepsäläinen",
      username: "tester",
      password: "test2023",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
  });
  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("blogs");
    cy.contains("Login");
    cy.get("form").should("have.class", "loginform");
    cy.get("#username").should("have.value", "");
    cy.get("#password").should("have.value", "");
    cy.get("#login-button").should("have.text", "login");
    cy.contains("login");
  });
});
