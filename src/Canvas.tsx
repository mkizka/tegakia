import React from "react";
import { Layer, Stage, Line } from "react-konva";
import Konva from "konva";
import { useWindowSize } from "@react-hook/window-size";

import { Note } from "./useNote";

type Props = {
  note: Note;
};

type DrawEventHandler = (
  e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
) => void;

const Canvas: React.VFC<Props> = ({ note }) => {
  const [width, height] = useWindowSize();

  const handleMouseDown: DrawEventHandler = (e) => {
    e.evt.preventDefault();
    // 2つ以上のタップのtouchstartを無視する
    if (e.evt instanceof TouchEvent && e.evt.touches.length >= 2) {
      return;
    }
    const pos = e.target.getStage()!.getPointerPosition()!;
    note.addLine(pos.x, pos.y);
    note.startDrawing();
  };

  const handleMouseMove: DrawEventHandler = (e) => {
    e.evt.preventDefault();
    if (e.evt instanceof MouseEvent && e.evt.buttons !== 1) {
      if (note.isDrawing) {
        // isDrawing時に左クリックなしでmousemoveするのは異常であるため
        // 例:左クリックを押したまま画面外にカーソルを移動させ、
        // 　 左クリックを離した後にカーソルをウインドウ内に戻した場合など
        // 　 (ウインドウ外で左クリックを離すとmouseupが呼ばれない)
        handleMouseUp(e);
      }
      return;
    }
    if (!note.isDrawing) {
      // isDrawingでない時にmousemoveした場合はmousedownと同じであるため
      // 例:mousedownしたままページを移動した場合など
      handleMouseDown(e);
    } else {
      const pos = e.target.getStage()!.getPointerPosition()!;
      note.updateLine(pos.x, pos.y);
    }
  };

  const handleMouseUp: DrawEventHandler = (e) => {
    e.evt.preventDefault();
    // 2つ以上のタップのtouchendを無視する
    // touchend時のevt.touchesに離したタップは含まれないため、ダブルタップ時のtouches.lengthは1
    if (e.evt instanceof TouchEvent && e.evt.touches.length >= 1) {
      return;
    }
    note.endDrawing();
    note.savePages();
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
          <Line
            key={i}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            points={line}
            stroke="red"
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
