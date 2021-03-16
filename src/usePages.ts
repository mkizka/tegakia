import { useState } from "react";
import { Page, emptyPage } from "./pages";

export function splitArrayIntoThree<T>(
  array: T[],
  index: number
): [T[], T, T[]] {
  if (index < 0 || array.length <= index) {
    throw Error();
  }
  const prevArray = [...array].slice(0, index);
  const [item, ...nextArray] = [...array].splice(index);
  return [prevArray, item, nextArray];
}

export function usePages(initialState: Page[]) {
  const [pages, setPages] = useState<Page[]>(initialState);
  const [pageIndex, setPageIndex] = useState(0);
  const [prevPages, currentPage, nextPages] = splitArrayIntoThree(
    pages,
    pageIndex
  );
  function setCurrentPage(newPage: Page) {
    setPages([...prevPages, newPage, ...nextPages]);
  }
  function backPage() {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  }
  function pushPage() {
    if (pageIndex == pages.length - 1) {
      setPages([...pages, emptyPage()]);
    }
    setPageIndex(pageIndex + 1);
  }
  return {
    pageIndex,
    setPageIndex,
    currentPage,
    setCurrentPage,
    pages,
    setPages,
    pushPage,
    backPage,
  };
}