import React from "react";
import { Select, SelectProps } from "@chakra-ui/react";

type Props = Pick<SelectProps, "value" | "onChange">;

const FpsSelect: React.VFC<Props> = (props) => {
  return (
    <Select {...props}>
      {[1, 2, 4, 8, 12, 24, 30, 60].map((fps) => (
        <option key={fps} value={fps}>
          {`FPS: ${fps}`}
        </option>
      ))}
    </Select>
  );
};

export default FpsSelect;
