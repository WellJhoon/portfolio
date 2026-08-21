describe("Hero Section & Technical Skills", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render terminal greeting and dynamic role text", () => {
    cy.get("#hero").should("be.visible");
    cy.get("[data-cy='hero-prompt']").should("be.visible");
    cy.get("[data-cy='cv-download-btn']").should("be.visible").and("have.attr", "href", "/jhon-medina-cv.pdf");
  });

  it("should render and scroll to experience timeline", () => {
    cy.get("[data-cy='experience-section']").scrollIntoView();

    cy.get("[data-cy='experience-section']").should("be.visible");
    cy.contains("Ministerio de Hacienda").should("be.visible");
    cy.contains("CardNET").should("be.visible");
  });

  it("should render skill categories and tech badges", () => {
    cy.get("[data-cy='skills-section']").scrollIntoView();

    cy.get("[data-cy='skills-section']").should("be.visible");
    cy.get("[data-cy='skills-section']").contains("Backend & Arquitectura").should("be.visible");
    cy.get("[data-cy='skills-section']").contains("Testing, QA & DevOps").should("be.visible");
    cy.get("[data-cy='skills-section']").contains("TypeScript").should("be.visible");
  });
});
