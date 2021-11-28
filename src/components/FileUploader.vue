<script setup lang="ts">
import {  } from 'vue'

defineProps<{
  src: string
 }>()

const emit = defineEmits<{ 
  (event: 'imageUploaded', file: File): void
 }>()


function emitFile(e: any): void {
  emit('imageUploaded', e.target.files[0]);
}

</script>

<template>
  <label for="userImage">Escolha uma imagem
    <input type="file" name="userImage" id="userImage"
    accept="image/*"
    @change="emitFile" />
  </label>
</template>

<style scoped>
</style>
