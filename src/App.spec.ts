import { renderHook, act } from "@testing-library/react-hooks";
import { emptyPage, splitArrayIntoThree, usePages } from "./App";

test("emptyPage", () => {
  const page = emptyPage();
  expect(page.lines).toStrictEqual([]);
  expect(page.redoableLines).toStrictEqual([]);
});

describe("splitArrayIntoThree", () => {
  it("範囲内のインデックスを指定すると配列を分割する", () => {
    type SafeCase = [number[], number, [number[], number, number[]]];
    const safeCases: SafeCase[] = [
      [[1, 2, 3, 4, 5], 2, [[1, 2], 3, [4, 5]]],
      [[1, 2], 1, [[1], 2, []]],
      [[1, 2], 0, [[], 1, [2]]],
      [[1], 0, [[], 1, []]],
    ];
    for (const [array, index, output] of safeCases) {
      const result = splitArrayIntoThree(array, index);
      expect(result).toStrictEqual(output);
    }
  });
  it("0未満か範囲外のインデックスを指定するとエラー", () => {
    type ErrorCase = [number[], number];
    const errorCases: ErrorCase[] = [
      [[1, 2, 3], 3],
      [[1, 2, 3], -1],
      [[], 1],
    ];
    for (const [array, index] of errorCases) {
      expect(() => {
        splitArrayIntoThree(array, index);
      }).toThrowError();
    }
  });
});

describe("usePages", () => {
  describe("pushPage", () => {
    it("ページを増やしつつ次ページへ", () => {
      const { result } = renderHook(() => usePages([emptyPage()]));
      expect(result.current.pageIndex).toBe(0);
      expect(result.current.pages.length).toBe(1);
      act(() => {
        result.current.pushPage();
      });
      expect(result.current.pageIndex).toBe(1);
      expect(result.current.pages.length).toBe(2);
    });
    it("ページを増やさず次ページへ", () => {
      const { result } = renderHook(() => usePages([emptyPage(), emptyPage()]));
      expect(result.current.pageIndex).toBe(0);
      expect(result.current.pages.length).toBe(2);
      act(() => {
        result.current.pushPage();
      });
      expect(result.current.pageIndex).toBe(1);
      expect(result.current.pages.length).toBe(2);
    });
  });
});
