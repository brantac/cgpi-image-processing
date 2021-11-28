import { getImageData } from "../canvasUtilities";

export default function sepia(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement): void {
    const imgData = getImageData(ctx, img);
    let data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
    }
    ctx.putImageData(imgData, 0, 0);
}