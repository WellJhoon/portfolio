describe("Projects & Technical Simulators", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy='projects-section']").scrollIntoView();
  });

  it("should filter projects by category", () => {
    cy.get("[data-cy='projects-section']").should("be.visible");

    cy.get("[data-cy='project-filter-qa']").click();

    cy.get("[data-cy='project-card-cypress-e2e-suite']").should("be.visible");

    cy.get("[data-cy='project-filter-all']").click();

    cy.get("[data-cy='project-card-cypress-e2e-suite']").should("be.visible");
    cy.get("[data-cy='project-card-angular-fintech-portal']").should("be.visible");
  });

  it("should run technical simulation in project card", () => {
    cy.get("[data-cy='project-simulator-start-btn']").first().click();

    cy.get("[data-cy='projects-section']").contains("Procesando...").should("be.visible");
  });
});
