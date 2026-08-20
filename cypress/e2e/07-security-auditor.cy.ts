describe("Security & Compliance Auditor", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open auditor modal from navigation trigger", () => {
    cy.get("button[title*='Auditoría de Seguridad']").click();

    cy.contains("Auditoría de Seguridad & Cumplimiento").should("be.visible");
    cy.contains("button", "Ejecutar Escaneo").should("be.visible");

    cy.get("div.fixed button").first().click();
  });
});
