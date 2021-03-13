export type Line = number[];

export type Page = {
  lines: Line[];
  redoableLines: Line[];
};

export function emptyPage(): Page {
  return { lines: [], redoableLines: [] };
}
