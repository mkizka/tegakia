import React from "react";
import { Layer, Stage, Line } from "react-konva";
import Konva from "konva";
import { useWindowSize } from "@react-hook/window-size";

import { Note } from "./useNote";

type Props = {
  note: Note;
  isDrawing: React.MutableRefObject<boolean>;
};

type DrawEventHandler = (
  e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
) => void;

const Canvas: React.VFC<Props> = ({ note, isDrawing }) => {
  const [width, height] = useWindowSize();

  const handleMouseDown: DrawEventHandler = (e) => {
    const pos = e.target.getStage()!.getPointerPosition()!;
    note.addLine(pos.x, pos.y);
    isDrawing.current = true;
  };

  const handleMouseMove: DrawEventHandler = (e) => {
    if (e.evt instanceof MouseEvent && e.evt.buttons !== 1) {
      if (isDrawing.current) {
        // isDrawing時に左クリックなしでmousemoveするのは異常であるため
        // 例:左クリックを押したまま画面外にカーソルを移動させ、
        // 　 左クリックを離した後にカーソルをウインドウ内に戻した場合など
        // 　 (ウインドウ外で左クリックを離すとmouseupが呼ばれない)
        handleMouseUp(e);
      }
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

  const handleMouseUp: DrawEventHandler = (_) => {
    isDrawing.current = false;
  };

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        {note.currentPage.lines.map((line, i) => (
          <Line key={i} points={line} stroke="red" />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
