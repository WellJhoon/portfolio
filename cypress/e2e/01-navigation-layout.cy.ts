describe("Navigation & Global Layout", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render main layout containers", () => {
    cy.get("nav").should("be.visible");
    cy.get("main").should("be.visible");
    cy.get("footer").should("be.visible");
  });

  it("should open and close command palette with keyboard shortcut", () => {
    cy.get("body").type("{ctrl}k");

    cy.get("input[placeholder*='Escribe un comando']").should("be.visible");
    cy.get("input[placeholder*='Escribe un comando']").type("radar");

    cy.contains("06. Radar Global").should("be.visible");

    cy.get("body").type("{esc}");

    cy.get("input[placeholder*='Escribe un comando']").should("not.exist");
  });

  it("should switch languages between Spanish and English", () => {
    cy.contains("button", "EN").click();

    cy.contains("Interactive Technical Architecture").should("be.visible");

    cy.contains("button", "ES").click();

    cy.contains("Arquitectura Técnica Interactiva").should("be.visible");
  });

  it("should toggle between Dark Mode and Light Mode", () => {
    cy.get("button[aria-label='Cambiar a modo claro']").click();

    cy.get("html").should("not.have.class", "dark");

    cy.get("button[aria-label='Cambiar a modo oscuro']").click();

    cy.get("html").should("have.class", "dark");
  });

  it("should scroll to top when clicking footer button", () => {
    cy.get("footer").scrollIntoView();

    cy.contains("footer button", "Volver arriba").click();

    cy.window().its("scrollY").should("equal", 0);
  });
});
