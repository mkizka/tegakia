import React from "react";
import { Layer, Stage, Line } from "react-konva";
import Konva from "konva";
import { useWindowSize } from "@react-hook/window-size";

import { Note } from "./useNote";

type Props = {
  note: Note;
  isDrawing: React.MutableRefObject<boolean>;
};

const Canvas: React.VFC<Props> = ({ note, isDrawing }) => {
  const [width, height] = useWindowSize();

  const handleMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const pos = e.target.getStage()!.getPointerPosition()!;
    note.addLine(pos.x, pos.y);
    isDrawing.current = true;
  };

  const handleMouseMove = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    if (e.evt instanceof MouseEvent && e.evt.buttons !== 1) {
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
