import { useState, useRef, useEffect } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps, setFps] = useState(12);
  const isDrawing = useRef(false);
  const [prevPages, currentPage, nextPages] = splitArrayIntoThree(
    pages,
    pageIndex
  );
  useEffect(() => {
    /**
     * useEffect内でdepsを更新することで無限ループする
     * 再生開始の場合
     * 1. isPlayingが変化
     * 2. setTimeout発火
     * 3. pageIndexが変化
     * 4. setTimeout発火 以降ループ
     */
    const playInterval = setTimeout(() => {
      if (!isPlaying) return;
      if (pageIndex == pages.length - 1) {
        setPageIndex(0);
      } else {
        setPageIndex(pageIndex + 1);
      }
      startDrawing();
    }, 1000 / fps);
    return () => clearInterval(playInterval);
  }, [pageIndex, isPlaying]);

  function play() {
    setIsPlaying(true);
  }
  function stop() {
    setIsPlaying(false);
  }
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
    endDrawing();
  }
  function pushPage() {
    if (pageIndex == pages.length - 1) {
      setPages([...pages, emptyPage()]);
    }
    setPageIndex(pageIndex + 1);
    endDrawing();
  }
  function savePages() {
    localStorage.setItem("note.pages", JSON.stringify(pages));
  }
  function deletePages() {
    setPageIndex(0);
    setPages([emptyPage()]);
    localStorage.removeItem("note.pages");
  }
  function startDrawing() {
    isDrawing.current = true;
  }
  function endDrawing() {
    isDrawing.current = false;
  }
  return {
    pageIndex,
    setPageIndex,
    fps,
    setFps,
    isPlaying,
    play,
    stop,
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
    startDrawing,
    endDrawing,
    isDrawing: isDrawing.current,
  };
}

export type Note = ReturnType<typeof useNote>;
