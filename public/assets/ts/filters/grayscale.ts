import { getImageData } from "../canvasUtilities";

export default function grayscale(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement): void {
    const imgData = getImageData(ctx, img);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    ctx.putImageData(imgData, 0, 0);
}