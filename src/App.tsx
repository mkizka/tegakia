import { KonvaEventObject } from "konva/types/Node";
import React, { useState, useRef } from "react";
import { Layer, Stage, Text, Line } from "react-konva";

const App = () => {
  const [lines, setLines] = useState<number[][]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()!.getPointerPosition()!;
    setLines([...lines, [pos.x, pos.y]]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage()!;
    const pos = stage.getPointerPosition()!;
    const latestLine = lines.pop()!;
    setLines([...lines, [...latestLine, pos.x, pos.y]]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line key={i} points={line} stroke="red" />
        ))}
      </Layer>
    </Stage>
  );
};

export default App;
