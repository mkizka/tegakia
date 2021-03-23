describe("google search", () => {
  it("should work", () => {
    cy.visit("http://www.google.com");
    cy.get("input").type("Hello world{enter}");
  });
});
