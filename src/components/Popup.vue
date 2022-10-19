<script setup>
import CloseIcon from "@/components/icons/close.svg"
import { useStore } from "@/stores/store"
import VideoPlayer from "./VideoPlayer.vue"
const store = useStore()

const close = () => {
    store.popup.show=false
}
</script>

<template>
  <div class="wrapper" v-if=store.popup.show>
    <div class="popup">
      <CloseIcon class="popup__close" @click="close"/>
      <div class="popup__main">
          <div v-if="store.popup.has_video" class="popup__video">
              <VideoPlayer />
          </div>        
          <div v-else class="popup__id">ID: {{ store.popup.id }}</div>
      </div>
    </div>
  </div>  
</template>

<style lang="sass" scoped>
  .wrapper
    display: flex
    align-items: center
    justify-content: center
    width: 100vw
    height: 100vh
    position: absolute
    top:  0
    background-color: rgba(0, 0, 0, 0.5)
  .popup
    position: absolute
    min-width: 150px
    min-height: 80px
    background-color: #fff
    border-radius: 15px
    z-index: 2
    padding: 30px
    &__close
      position: absolute
      right: 10px
      top: 10px
      width: 25px
      height: 25px
      cursor: pointer
    &__main
      display: flex
      align-items: center
      justify-content: center  
    &__id
      font-size: 1.3rem  
      
</style>
