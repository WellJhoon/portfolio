describe("Navigation & Global Layout", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render main layout containers", () => {
    cy.get("nav").should("be.visible");
    cy.get("main").should("be.visible");
    cy.get("footer").should("be.visible");
  });

  it("should open and close command palette with trigger button and esc key", () => {
    cy.get("[data-cy='nav-cmds-btn']").first().click({ force: true });

    cy.get("[data-cy='command-palette-modal']").should("be.visible");
    cy.get("[data-cy='command-palette-input']").type("radar");
    cy.get("[data-cy='command-item-radar']").should("be.visible");

    cy.get("body").type("{esc}");

    cy.get("[data-cy='command-palette-modal']").should("not.exist");
  });

  it("should switch languages between Spanish and English", () => {
    cy.get("[data-cy='lang-en-btn']").first().click();

    cy.get("[data-cy='cv-download-btn']").should("contain.text", "CV");

    cy.get("[data-cy='lang-es-btn']").first().click();

    cy.get("[data-cy='cv-download-btn']").should("contain.text", "CV");
  });

  it("should toggle between Dark Mode and Light Mode", () => {
    cy.get("[data-cy='theme-toggle-btn']").first().click();

    cy.get("html").should("not.have.class", "dark");

    cy.get("[data-cy='theme-toggle-btn']").first().click();

    cy.get("html").should("have.class", "dark");
  });

  it("should have footer back to top link", () => {
    cy.scrollTo("bottom");

    cy.get("[data-cy='footer-back-to-top']").should("be.visible").and("have.attr", "href", "#hero");
    cy.get("[data-cy='footer-back-to-top']").click();
  });
});
