describe("Home Page & Core UI", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page and render key layout elements", () => {
    cy.get("nav").should("be.visible");
    cy.get("main").should("be.visible");
    cy.get("footer").should("be.visible");
  });

  it("should navigate through core sections", () => {
    cy.get("#hero").should("exist");
    cy.get("#experience").should("exist");
    cy.get("#skills").should("exist");
    cy.get("#projects").should("exist");
    cy.get("#game-mode").should("exist");
    cy.get("#radar-map").should("exist");
    cy.get("#guestbook").should("exist");
    cy.get("#contact").should("exist");
  });

  it("should toggle language between ES and EN", () => {
    cy.contains("button", "EN").click();

    cy.contains("Interactive Technical Architecture").should("be.visible");

    cy.contains("button", "ES").click();

    cy.contains("Arquitectura Técnica Interactiva").should("be.visible");
  });

  it("should toggle dark and light themes", () => {
    cy.get("button[aria-label='Cambiar a modo claro']").click();

    cy.get("html").should("not.have.class", "dark");

    cy.get("button[aria-label='Cambiar a modo oscuro']").click();

    cy.get("html").should("have.class", "dark");
  });
});
