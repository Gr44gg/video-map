<script setup>
import { initMap } from '@/js/maplibre'
import { onMounted } from 'vue'

onMounted(() => {
  const map = initMap("map")
})

</script>

<template>
  <div id="map"></div>
</template>

<style lang="sass" scoped>
  #map
    width: 100vw
    height: 100vh
</style>
