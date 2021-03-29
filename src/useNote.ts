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

function loadPages() {
  const savedPages = localStorage.getItem("note.pages");
  if (savedPages != null) {
    return JSON.parse(savedPages) as Page[];
  }
  return null;
}

export function useNote(initialState?: Page[]) {
  const [pages, setPages] = useState<Page[]>(
    initialState || loadPages() || [emptyPage()]
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [prevPages, currentPage, nextPages] = splitArrayIntoThree(
    pages,
    pageIndex
  );
  function setCurrentPage(newPage: Page) {
    setPages([...prevPages, newPage, ...nextPages]);
  }
  function addLine(x: number, y: number) {
    setCurrentPage({
      lines: [...currentPage.lines, [x, y]],
      redoableLines: currentPage.redoableLines,
    });
  }
  function updateLine(x: number, y: number) {
    const currentLine = currentPage.lines.pop()!;
    setCurrentPage({
      lines: [...currentPage.lines, [...currentLine, x, y]],
      redoableLines: currentPage.redoableLines,
    });
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
  function savePages() {
    localStorage.setItem("note.pages", JSON.stringify(pages));
  }
  function deletePages() {
    setPages([emptyPage()]);
    localStorage.removeItem("note.pages");
  }
  return {
    pageIndex,
    setPageIndex,
    currentPage,
    setCurrentPage,
    addLine,
    updateLine,
    pages,
    setPages,
    pushPage,
    backPage,
    savePages,
    deletePages,
  };
}

export type Note = ReturnType<typeof useNote>;
