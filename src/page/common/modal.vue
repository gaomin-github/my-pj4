<template>
  <section class="modal-container">
    <slot></slot>
  </section>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  .modal-container{
    position: fixed;
    z-index: 999;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.4);
  }
</style>
