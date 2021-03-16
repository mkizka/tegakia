import { KonvaEventObject } from "konva/types/Node";
import React, { useState, useEffect, useRef } from "react";
import { Layer, Stage, Line } from "react-konva";
import { emptyPage } from "./pages";
import { useNote } from "./useNote";

const App = () => {
  const note = useNote([emptyPage()]);
  const [isPlaying, setIsPlaying] = useState(false);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const pos = e.target.getStage()!.getPointerPosition()!;
    note.addLine(pos.x, pos.y);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.buttons !== 1) {
      // mousemoveかつ左クリックがない場合、mouseupと同じであるため
      // 例:mousedownしたまま画面外にカーソルを移動させた後に復帰した場合など
      handleMouseUp();
      return;
    }
    const stage = e.target.getStage()!;
    const pos = stage.getPointerPosition()!;
    if (!isDrawing.current) {
      // isDrawingでない時にmousemoveした場合はmousedownと同じであるため
      // 例:mousedownしたままページを移動した場合など
      handleMouseDown(e);
    } else {
      note.updateLine(pos.x, pos.y);
    }
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
      if (note.pageIndex == note.pages.length - 1) {
        note.setPageIndex(0);
      } else {
        note.setPageIndex(note.pageIndex + 1);
      }
      // ページ移動後に再度新しく線が引けるように
      isDrawing.current = false;
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
        onMouseUp={handleMouseUp}
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
