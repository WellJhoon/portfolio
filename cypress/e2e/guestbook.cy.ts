describe("Pixel Art Guestbook", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#guestbook").scrollIntoView();
  });

  it("should render 16x16 canvas and drawing tools", () => {
    cy.get("#guestbook").should("be.visible");
    cy.contains("Lienzo 16x16 Pixel Art").should("be.visible");
    cy.contains("button", "Lápiz").should("be.visible");
    cy.contains("button", "Relleno").should("be.visible");
    cy.contains("button", "Borrador").should("be.visible");
  });

  it("should validate empty canvas submission", () => {
    cy.get("input[placeholder='ej. Alex Dev']").type("Tester");

    cy.contains("button", "Firmar Libro de Visitas").click();

    cy.contains("¡El lienzo está vacío! Dibuja algo antes de firmar.").should("be.visible");
  });
});
