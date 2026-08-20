describe("Interactive Arcade Mode", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#game-mode").scrollIntoView();
  });

  it("should render game selector and switch between games", () => {
    cy.get("#game-mode").should("be.visible");
    cy.contains("button", "1. Tech Ninja").should("be.visible");
    cy.contains("button", "2. Super Jhon Platformer").should("be.visible");

    cy.contains("button", "1. Tech Ninja").click();

    cy.contains("Tech Ninja").should("be.visible");
    cy.get("canvas").should("be.visible");

    cy.contains("button", "2. Super Jhon Platformer").click();

    cy.contains("SUPER JHON").should("be.visible");
    cy.get("canvas").should("be.visible");
  });

  it("should start Super Jhon Platformer from idle overlay", () => {
    cy.contains("button", "2. Super Jhon Platformer").click();

    cy.contains("button", "Jugar Nivel Aleatorio").click();

    cy.contains("button", "Jugar Nivel Aleatorio").should("not.exist");
  });
});
