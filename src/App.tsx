import { KonvaEventObject } from "konva/types/Node";
import React, { useState, useEffect } from "react";
import { Layer, Stage, Line } from "react-konva";
import { emptyPage } from "./pages";
import { useNote } from "./useNote";

const App = () => {
  const note = useNote([emptyPage()]);
  const [isPlaying, setIsPlaying] = useState(false);

  const addLineToCurrentPage = (x: number, y: number) => {
    note.setCurrentPage({
      lines: [...note.currentPage.lines, [x, y]],
      redoableLines: note.currentPage.redoableLines,
    });
  };

  const updateLineToCurrentPage = (x: number, y: number) => {
    const currentLine = note.currentPage.lines.pop()!;
    note.setCurrentPage({
      lines: [...note.currentPage.lines, [...currentLine, x, y]],
      redoableLines: note.currentPage.redoableLines,
    });
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const pos = e.target.getStage()!.getPointerPosition()!;
    addLineToCurrentPage(pos.x, pos.y);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.buttons !== 1) {
      return;
    }
    const stage = e.target.getStage()!;
    const pos = stage.getPointerPosition()!;
    if (note.currentPage.lines.length == 0) {
      addLineToCurrentPage(pos.x, pos.y);
    } else {
      updateLineToCurrentPage(pos.x, pos.y);
    }
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
      if (note.pageIndex == note.pages.length - 1) {
        note.setPageIndex(0);
      } else {
        note.setPageIndex(note.pageIndex + 1);
      }
    }, 1000 / 30);
    return () => clearInterval(playInterval);
  }, [note.pageIndex, isPlaying]);

  const play = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <p>
        <button onClick={note.backPage}>{"<"}</button>
        <button onClick={note.pushPage}>{">"}</button>
        <button onClick={play}>{isPlaying ? "stop" : "play"}</button>
      </p>
      <p>
        {note.pageIndex + 1}/{note.pages.length}
      </p>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {note.currentPage.lines.map((line, i) => (
            <Line key={i} points={line} stroke="red" />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default App;
