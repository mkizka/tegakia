import React from "react";
import { Select, SelectProps } from "@chakra-ui/react";

const FpsSelect: React.VFC<SelectProps> = (props) => {
  return (
    <Select {...props}>
      {[1, 2, 4, 8, 12, 24, 30, 60].map((fps) => (
        <option key={fps} value={fps}>
          {fps}
        </option>
      ))}
    </Select>
  );
};

export default FpsSelect;
