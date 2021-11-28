export function histogram (data: Uint8ClampedArray): number[][] {
  const histogram: number[][] = [];
  const r: number[] = new Array(256).fill(0);
  const g: number[] = new Array(256).fill(0);
  const b: number[] = new Array(256).fill(0);
  histogram.push(r, g, b);

  for (let i = 0; i < data.length; i++) {
    histogram[0][data[i]]++;
    histogram[1][data[i + 1]]++;
    histogram[2][data[i + 2]]++;
  }
  return histogram;
}

export function redHistogram (data: Uint8ClampedArray): number[] {
  const histogram: number[] = new Array(256).fill(0);

  for (let i = 0; i < data.length; i+=4) {
    let r = data[i];
    histogram[r]++;
  }
  return histogram;
}

export function greenHistogram (data: Uint8ClampedArray): number[] {
  const histogram: number[] = new Array(256).fill(0);

  for (let i = 0; i < data.length; i+=4) {
    let g = data[i + 1];
    histogram[g]++;
  }
  return histogram;
}

export function blueHistogram (data: Uint8ClampedArray): number[] {
  const histogram: number[] = new Array(256).fill(0);

  for (let i = 0; i < data.length; i+=4) {
    let b = data[i + 2];
    histogram[b]++;
  }
  return histogram;
}