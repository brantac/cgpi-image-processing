import { getImageData } from "../canvasUtilities";

export default function blackAndWhite(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement): void {
    const imgData = getImageData(ctx, img);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        avg > 128 ? data[i] = data[i + 1] = data[i + 2] = 255 : data[i] = data[i + 1] = data[i + 2] = 0;
    }
    ctx.putImageData(imgData, 0, 0);
}