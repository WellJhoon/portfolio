describe("Projects & Technical Simulators", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#projects").scrollIntoView();
  });

  it("should filter projects by category", () => {
    cy.get("#projects").should("be.visible");

    cy.contains("button", "Cypress / QA").click();

    cy.contains("Enterprise Cypress E2E Testing Suite").should("be.visible");

    cy.contains("button", "Todos").click();

    cy.contains("Enterprise Cypress E2E Testing Suite").should("be.visible");
    cy.contains("Fintech Multi-Merchant Portal").should("be.visible");
  });

  it("should run technical simulation in project card", () => {
    cy.contains("button", "▶ Ejecutar Simulación").first().click();

    cy.contains("✓").should("be.visible");
  });
});
