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
    cy.get("[data-cy='guestbook-section']").scrollIntoView();
  });

  it("should render drawing canvas and toolbar buttons", () => {
    cy.wait("@getGuestbook");

    cy.get("[data-cy='guestbook-section']").should("be.visible");
    cy.get("[data-cy='pixel-tool-pencil']").should("be.visible");
    cy.get("[data-cy='pixel-tool-bucket']").should("be.visible");
    cy.get("[data-cy='pixel-tool-eraser']").should("be.visible");
  });

  it("should prevent empty canvas submission with validation error", () => {
    cy.wait("@getGuestbook");

    cy.get("[data-cy='guestbook-author-input']").type("Automation Tester");

    cy.get("[data-cy='guestbook-submit-btn']").click();

    cy.get("[data-cy='guestbook-error-msg']").should("be.visible");
  });
});
