import { histogram } from '../src/assets/ts/histogram';

export default function main () {
    let h: number[] = [];
    const image = new Uint8ClampedArray(40000);
    for (let i = 0; i < image.length; i++) {
        image[i] = Math.random() * 256;
    }

    h = histogram(image);

    for (let i = 0; i < h.length; i++) {
        console.log(`${i}: ${h[i]}`);
    }
    
}