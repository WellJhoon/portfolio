describe("Hero Section & Technical Skills", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render terminal greeting and dynamic role text", () => {
    cy.get("#hero").should("be.visible");
    cy.contains("span", "jhon@fedora:~$").should("be.visible");
    cy.contains("a", "Descargar CV (PDF)").should("have.attr", "href", "/cv-jhon-medina.pdf");
  });

  it("should render and scroll to experience timeline", () => {
    cy.get("#experience").scrollIntoView();

    cy.get("#experience").should("be.visible");
    cy.contains("Ministerio de Hacienda").should("be.visible");
    cy.contains("CardNET").should("be.visible");
  });

  it("should render skill categories and tech badges", () => {
    cy.get("#skills").scrollIntoView();

    cy.get("#skills").should("be.visible");
    cy.contains("Frontend & Mobile").should("be.visible");
    cy.contains("Backend & Arquitectura").should("be.visible");
    cy.contains("Testing & QA Automation").should("be.visible");
  });
});
