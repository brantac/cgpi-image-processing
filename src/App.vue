<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import FileUploader from './components/FileUploader.vue';
import Canvas from './components/Canvas.vue';
import { ref } from '@vue/reactivity';

const imgSrc = ref('');

function changeImgSrc(file: File) {
  imgSrc.value = URL.createObjectURL(file);
}
</script>

<template>
  <h1>Processador de Imagens</h1>
  <FileUploader :src="imgSrc" @imageUploaded="changeImgSrc($event)" />
  <Canvas :src="imgSrc" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
