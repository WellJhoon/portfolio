describe("Interactive Arcade Mode", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#game-mode").scrollIntoView();
  });

  it("should render arcade section and game mode selectors", () => {
    cy.get("#game-mode").should("be.visible");
    cy.contains("button", "1. Tech Ninja").should("be.visible");
    cy.contains("button", "2. Super Jhon Platformer").should("be.visible");
  });

  it("should switch between Tech Ninja and Super Jhon Platformer without errors", () => {
    cy.contains("button", "1. Tech Ninja").click();

    cy.contains("Tech Ninja").should("be.visible");

    cy.contains("button", "2. Super Jhon Platformer").click();

    cy.contains("SUPER JHON").should("be.visible");
  });
});
