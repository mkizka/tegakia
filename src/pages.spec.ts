import { emptyPage } from "./pages";

describe("emptyPage", () => {
  it("空ページを生成", () => {
    const page = emptyPage();
    expect(page.lines).toStrictEqual([]);
    expect(page.redoableLines).toStrictEqual([]);
  });
});
