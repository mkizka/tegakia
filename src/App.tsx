import { KonvaEventObject } from "konva/types/Node";
import React, { useState, useRef } from "react";
import { Layer, Stage, Line } from "react-konva";

type Line = number[];

type Page = {
  lines: Line[];
  redoableLines: Line[];
};

function emptyPage(): Page {
  return { lines: [], redoableLines: [] };
}

function splitArrayIntoThree<T>(index: number, array: T[]): [T[], T, T[]] {
  const prevArray = index > 0 ? [...array].slice(0, index) : [];
  const [item, ...nextArray] = [...array].splice(index);
  return [prevArray, item, nextArray];
}

function usePages() {
  const [pages, setPages] = useState<Page[]>([emptyPage()]);
  const [pageIndex, setPageIndex] = useState(0);
  const [prevPages, currentPage, nextPages] = splitArrayIntoThree(
    pageIndex,
    pages
  );
  function setCurrentPage(newPage: Page) {
    setPages([...prevPages, newPage, ...nextPages]);
  }
  return {
    pageIndex,
    setPageIndex,
    currentPage,
    setCurrentPage,
    pages,
    setPages,
  };
}

const App = () => {
  const {
    pageIndex,
    setPageIndex,
    currentPage,
    setCurrentPage,
    pages,
    setPages,
  } = usePages();
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()!.getPointerPosition()!;
    setCurrentPage({
      lines: [...currentPage.lines, [pos.x, pos.y]],
      redoableLines: currentPage.redoableLines,
    });
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage()!;
    const pos = stage.getPointerPosition()!;
    const currentLine = currentPage.lines.pop()!;
    setCurrentPage({
      lines: [...currentPage.lines, [...currentLine, pos.x, pos.y]],
      redoableLines: currentPage.redoableLines,
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const backPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const pushPage = () => {
    if (pageIndex == pages.length - 1) {
      setPages([...pages, emptyPage()]);
    }
    setPageIndex(pageIndex + 1);
  };

  return (
    <>
      <p>
        <button onClick={backPage}>{"<"}</button>
        <button onClick={pushPage}>{">"}</button>
      </p>
      <p>
        {pageIndex + 1}/{pages.length}
      </p>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {currentPage.lines.map((line, i) => (
            <Line key={i} points={line} stroke="red" />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default App;
