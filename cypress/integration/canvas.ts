describe("ペン", () => {
  beforeEach(() => {
    cy.visit("/?hideMenu");
  });
  it("マウスで線が引ける", () => {
    cy.get("canvas")
      .trigger("mousedown", { x: 10, y: 100 })
      .trigger("mousemove", { x: 50, y: 200 })
      .trigger("mousemove", { x: 70, y: 220 })
      .trigger("mousemove", { x: 100, y: 220 })
      .trigger("mouseup")
      .matchImageSnapshot("mouse-simple-draw", {
        failureThreshold: 0.01,
        failureThresholdType: "percent",
      });
  });
});
