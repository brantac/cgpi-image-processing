export function getContext(canvas: HTMLCanvasElement) {
    return canvas.getContext('2d');
}

export function getImageData(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement
    ): ImageData { 
    return ctx.getImageData(0, 0, img.width, img.height);
}