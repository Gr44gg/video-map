<script setup>
import {ref, onMounted} from "vue"
import Hls from "hls.js"
import RoundButton from "./RoundButton.vue"
import Play from "@/components/icons/play.svg"
import Pause from "@/components/icons/pause.svg"
import Stop from "@/components/icons/stop.svg"

let video = ref()

const stopPlayback = () => {
    video.value.pause()
    video.value.currentTime = 0
}

onMounted(() => {
    let hls = new Hls()
    let stream = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    video.value = document.getElementById('video')
    hls.loadSource(stream) 
    hls.attachMedia(video.value)  
})
</script>

<template>
    <video id="video" width="360" height="240"></video>   
    <div class="controls">
        <RoundButton @click="video.play()"><Play /></RoundButton>
        <RoundButton @click="video.pause()"><Pause /></RoundButton>
        <RoundButton @click="stopPlayback"><Stop /></RoundButton>                
    </div>  
</template>

<style lang="sass" scoped>
  .controls
    display: flex
    gap: 15px
    align-items: center
    justify-content: center
</style>