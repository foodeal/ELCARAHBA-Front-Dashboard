// @ahmed: enum => use hours() to generate hours instead selected items
export const hours = (interval: number, start?: number, end?: number) => {
  return Array(24 * interval)
    .fill(0)
    .map((_, i) => ('0' + ~~(i / interval) + ':0' + 60 * ((i / interval) % 1)).replace(/\d(\d\d)/g, '$1'))
    .slice(start, end);
};
