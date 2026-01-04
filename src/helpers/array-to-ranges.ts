export function arrayToRanges(arr: number[]): number[][] {
  if (!arr.length) return [];

  arr = [...arr].sort((a, b) => a - b);
  const ranges: number[][] = [];
  let start = arr[0];
  let end = start;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === end + 1) {
      end = arr[i];
    } else {
      ranges.push([start, end]);
      start = end = arr[i];
    }
  }
  ranges.push([start, end]);
  return ranges;
}
