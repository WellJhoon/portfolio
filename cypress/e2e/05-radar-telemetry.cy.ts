describe("Global Radar & Visitor Telemetry", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/visitors", {
      statusCode: 200,
      body: {
        success: true,
        stats: [{ countryCode: "DO", count: 5, x: 28, y: 45 }],
        totalPings: 5,
        uniqueVisitors: 2,
        recentPings: [
          {
            id: "ping-1",
            countryCode: "DO",
            city: "Santo Domingo",
            timestamp: Date.now()
          }
        ]
      }
    }).as("postVisitors");

    cy.visit("/");
    cy.get("[data-cy='radar-section']").scrollIntoView();
  });

  it("should render global radar section and SVG map", () => {
    cy.get("[data-cy='radar-section']").should("be.visible");
    cy.get("svg").should("exist");
  });

  it("should display telemetry stats", () => {
    cy.get("[data-cy='radar-section']").contains("RADAR").should("be.visible");
  });
});
