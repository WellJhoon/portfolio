describe("Konami Code Easter Egg", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should trigger matrix cheat console when typing konami sequence", () => {
    cy.get("body").type("{uparrow}{uparrow}{downarrow}{downarrow}{leftarrow}{rightarrow}{leftarrow}{rightarrow}ba");

    cy.contains("MODO HACKER ACTIVADO").should("be.visible");

    cy.get("div.fixed button").first().click();

    cy.contains("MODO HACKER ACTIVADO").should("not.exist");
  });
});
