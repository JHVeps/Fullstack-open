describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const tester1 = {
      name: "Ted Tester",
      username: "ted",
      password: "ted2023",
    };
    const tester2 = {
      name: "Tod Tester",
      username: "tod",
      password: "tod2023",
    };

    cy.request("POST", "http://localhost:3003/api/users/", tester1);
    cy.request("POST", "http://localhost:3003/api/users/", tester2);
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

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("ted");
      cy.get("#password").type("ted2023");
      cy.get("#login-button").click();
      cy.contains("ted logged in");
    });

    it("fails with wrong credentials", function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("ted");
      cy.get("#password").type("ted202");
      cy.get("#login-button").click();
      cy.get(".error").should("contain", "invalid username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("ted");
      cy.get("#password").type("ted2023");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("add new").click();
      cy.contains("Create new");
      cy.get("#title").type("test if create blog works");
      cy.get("#author").type("Ted Tester");
      cy.get("#url").type("localhost");
      cy.contains("create").click();
      cy.contains("test if create blog works");
    });

    it("A blog can be liked", function () {
      cy.contains("add new").click();
      cy.contains("Create new");
      cy.get("#title").type("test if create blog works");
      cy.get("#author").type("Ted Tester");
      cy.get("#url").type("localhost");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.get("#likes").should("contain", "likes 0");
      cy.contains("like").click();
      cy.get("#likes").should("contain", "likes 1");
    });

    it("A blog can be removed", function () {
      cy.contains("add new").click();
      cy.contains("Create new");
      cy.get("#title").type("test if create blog works");
      cy.get("#author").type("Ted Tester");
      cy.get("#url").type("localhost");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.get(".app").should("not.contain", "test if create blog works");
    });

    it("remove button is only visible to creator", function () {
      cy.contains("add new").click();
      cy.contains("Create new");
      cy.get("#title").type("only ted can remove this");
      cy.get("#author").type("Ted Tester");
      cy.get("#url").type("localhost");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.get(".blog__info").should("contain", "remove");
      cy.contains("logout").click();
      cy.get("#username").type("tod");
      cy.get("#password").type("tod2023");
      cy.get("#login-button").click();
      cy.contains("view").click();
      cy.get(".blog__info").should("not.contain", ".delete__button");
    });
  });
});
