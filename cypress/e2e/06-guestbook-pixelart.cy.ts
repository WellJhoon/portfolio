describe("Pixel Art Guestbook", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/guestbook", {
      statusCode: 200,
      body: {
        success: true,
        entries: [
          {
            id: "entry-1",
            author_name: "Demo Dev",
            author_social: "https://github.com/demo",
            pixels: Array(256).fill("#e11d48"),
            status: "approved",
            created_at: new Date().toISOString()
          }
        ]
      }
    }).as("getGuestbook");

    cy.visit("/");
    cy.get("#guestbook").scrollIntoView();
  });

  it("should render drawing canvas and toolbar buttons", () => {
    cy.wait("@getGuestbook");

    cy.get("#guestbook").should("be.visible");
    cy.contains("Lienzo 16x16 Pixel Art").should("be.visible");
    cy.contains("button", "Lápiz").should("be.visible");
    cy.contains("button", "Relleno").should("be.visible");
    cy.contains("button", "Borrador").should("be.visible");
  });

  it("should prevent empty canvas submission with validation error", () => {
    cy.wait("@getGuestbook");

    cy.get("input[placeholder='ej. Alex Dev']").type("Automation Tester");

    cy.contains("button", "Firmar Libro de Visitas").click();

    cy.contains("¡El lienzo está vacío! Dibuja algo antes de firmar.").should("be.visible");
  });
});
