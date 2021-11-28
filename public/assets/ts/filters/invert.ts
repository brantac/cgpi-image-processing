import { getImageData } from "../canvasUtilities";

export default function invert(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement): void {
    const imgData = getImageData(ctx, img);
    let data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imgData, 0, 0);
}