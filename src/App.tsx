import { KonvaEventObject } from "konva/types/Node";
import React, { useState, useRef, useEffect } from "react";
import { Layer, Stage, Line } from "react-konva";
import { emptyPage } from "./pages";
import { usePages } from "./usePages";

const App = () => {
  const {
    pageIndex,
    setPageIndex,
    currentPage,
    setCurrentPage,
    pages,
    pushPage,
    backPage,
  } = usePages([emptyPage()]);
  const isDrawing = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    }, 1000 / 30);
    return () => clearInterval(playInterval);
  }, [pageIndex, isPlaying]);

  const play = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <p>
        <button onClick={backPage}>{"<"}</button>
        <button onClick={pushPage}>{">"}</button>
        <button onClick={play}>{isPlaying ? "stop" : "play"}</button>
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
