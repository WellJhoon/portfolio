describe("Interactive Arcade Mode", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy='arcade-section']").scrollIntoView();
  });

  it("should render arcade section and game selectors", () => {
    cy.get("[data-cy='arcade-section']").should("be.visible");
    cy.get("[data-cy='btn-select-techninja']").should("be.visible");
    cy.get("[data-cy='btn-select-platformer']").should("be.visible");
    cy.get("canvas").should("be.visible");
  });

  it("should start Tech Ninja game from start button", () => {
    cy.get("[data-cy='btn-select-techninja']").click();

    cy.get("[data-cy='btn-start-techninja']").click();

    cy.get("[data-cy='btn-start-techninja']").should("not.exist");
  });
});
