<script setup>

</script>

<template>
    <div class="button">
      <div class="button__content">
        <slot></slot>
      </div>
    </div>
</template>

<style lang="sass" scoped>
  .button
    display: flex
    align-items: center
    justify-content: center
    border-radius: 100px
    border: 1px solid black
    height: 50px
    width: 50px
    cursor: pointer   
    &:active
      background-color: #999 
    &__content
      width: 24px
      height: 24px
      
</style>
