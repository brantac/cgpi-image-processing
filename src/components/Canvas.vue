<script setup lang="ts">
import { onMounted, onUpdated, ref } from '@vue/runtime-core';
import { histogram } from '../assets/ts/histogram';
import { getContext, getImageData } from '../assets/ts/canvasUtilities'
import grayscale from '../assets/ts/filters/grayscale';
import sepia from '../assets/ts/filters/sepia';
import invert from '../assets/ts/filters/invert';
import blackAndWhite from '../assets/ts/filters/blackAndWhite';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const imgSrc = ref('');
const imgCanvas = ref();
const ctx = ref();
const img = ref();
const histogramCanvas = ref();
const histogramCtx = ref();
const chart = ref();
const apexChart = ref();

const prop = defineProps<{
    src: string
}>()

onMounted(() => {
    ctx.value = getContext(imgCanvas.value);
    histogramCtx.value = getContext(histogramCanvas.value);
})

onUpdated(() => {
    changeImageSrc(prop.src);
    createImage();
})

function createImage(): void {
    img.value = new Image();
    img.value.src = prop.src;
    img.value.onload = drawImage;
}

function drawImage() {
    ctx.value.drawImage(this, 0, 0, this.width, this.height,
     0, 0, imgCanvas.value.width, imgCanvas.value.height);
}

function changeImageSrc(src: string) {
    imgSrc.value = src;
}

// Filters
function applyGrayscale(): void {
    grayscale(ctx.value, img.value);
}

function applySepia(): void {
    sepia(ctx.value, img.value);
}

function applyInvert(): void {
    invert(ctx.value, img.value);
}

function applyBlackAndWhite(): void {
    blackAndWhite(ctx.value, img.value);
}

function clearFilters(): void {
    ctx.value.clearRect(0, 0, imgCanvas.value.width, imgCanvas.value.height);
    ctx.value.drawImage(img.value, 0, 0, imgCanvas.value.width, imgCanvas.value.height);
}

function saveImage(): void {
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = imgCanvas.value.toDataURL('image/png');
    link.click();
}

function saveHistogram(): void {
    const link = document.createElement('a');
    link.download = 'histogram.png';
    link.href = histogramCanvas.value.toDataURL('image/png');
    link.click();
}

// ApexChart.js
function loadApexChart(): void {
    const data = getImageData(ctx.value, img.value).data;
    const red = (new Array(256)).fill(0);
    const green = (new Array(256)).fill(0);
    const blue = (new Array(256)).fill(0);
    const categories = red.map((el, i) => i + 1);

    // RGB's histograms
    for (let i = 0; i < data.length; i += 4) {
        red[data[i]]++;
        green[data[i + 1]]++;
        blue[data[i + 2]]++;
    }

    for (let i = 0; i < 40; i += 4) {
        console.log(`R: ${red[i]}, G: ${green[i + 1]}, B: ${blue[i + 2]}`);
    }

    var options = {
        chart: {
            type: 'line'
        },
        series: [
            {
            name: 'red',
            data: red
            }, {
            name: 'green',
            data: green
            }
        ],
        xaxis: {
            categories: categories
        }
    }

    apexChart.value = new ApexCharts(chart.value, 
    options);

    apexChart.value.render();
}
// Chart.js
function createChart (): void {
    const data = histogram(getImageData(ctx.value, img.value).data);
    const labels = data[0].map((_, i) => i );
    const redMax = data[0].reduce((a,b) => Math.max(a,b));
    histogramChart.value = new Chart(histogramCtx.value, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Histograma',
                data: [...data[0]],
                backgroundColor: 'gray',
                borderColor: 'gray',
                borderWidth: 1,
                // borderPercent: 1
            }]
        },
        options: {
            // animation: false,
            // parsing: false,
            // plugins: {
            //     decimation: decimation,
            // },
            scales: {
                x: {
                    type: 'linear',
                    min: 0,
                    max: 255,
                    beginAtZero: true
                }
            }
        }
    });
}

function showHistogram(): void {
    // const decimation = {
    //     enable: true,
    //     algorithm: 'min-max',
    // }
    const data = histogram(getImageData(ctx.value, img.value).data);
    const labels = data[0].map((_, i) => i );
    const redMax = data[0].reduce((a,b) => Math.max(a,b));
    if(histogramChart.value === undefined) {
        createChart();
    }
    else {
        histogramChart.value.data.datasets[0].data = data[0];
        histogramChart.value.data.labels = labels;
        histogramChart.value.update();
    }
}
</script>

<template>
    <div id="img-canvas-container">
        <p>1. Após escolher uma imagem, selecione um dos 4 filtros</p>
        <p>2. Após escolher um filtro, clique em "Histograma",
            para gerar um histograma da imagem, ou clique em "Salvar imagem",
            para fazer o download dela.</p>
        
        <!-- <button class="btn-menu" @click="showHistogram">Histograma</button> -->
        <button class="btn-menu" @click="loadApexChart">Histograma</button>
        <button class="btn-menu" @click="applyGrayscale">Escala de cinza</button>
        <button class="btn-menu" @click="applySepia">Sepia</button>
        <button class="btn-menu" @click="applyInvert">Inverter</button>
        <button class="btn-menu" @click="applyBlackAndWhite">Preto e branco</button>

        <br>

        <button class="btn-menu" @click="clearFilters">Limpar filtros</button>
        <button class="btn-menu" @click="saveImage">Salvar imagem</button>
        <button class="btn-menu" @click="saveHistogram">Salvar histograma</button>
        
        <br>
        <!-- Image Canvas -->
        <canvas ref="imgCanvas" width="300" height="400"></canvas>
        <!-- /Image Canvas -->

    </div>
    <div id="histogram-container">
        <div id="chart" ref="chart"></div>
        <canvas ref="histogramCanvas" id="histogram" width="400" height="200"></canvas>
    </div>
</template>

<style scoped>
#chart {
    max-width: 1200px;
    margin: 35px auto;
}
#img-canvas-container {
    margin: 16px 0 5px 0;
}
.btn-menu {
    margin: 5px 5px;
}
canvas {
    margin: 16px 0 0 0;
    border: 1px solid gray;
}
</style>