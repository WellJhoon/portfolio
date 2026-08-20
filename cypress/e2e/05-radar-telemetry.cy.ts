describe("Global Radar & Visitor Telemetry", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/visitors", {
      statusCode: 200,
      body: {
        success: true,
        stats: [{ countryCode: "DO", count: 5 }],
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
    }).as("getVisitors");

    cy.visit("/");
    cy.get("#radar-map").scrollIntoView();
  });

  it("should render global radar section and SVG map", () => {
    cy.wait("@getVisitors");

    cy.get("#radar-map").should("be.visible");
    cy.get("svg").should("exist");
  });

  it("should display telemetry stats", () => {
    cy.wait("@getVisitors");

    cy.contains("RADAR GLOBAL").should("be.visible");
  });
});
