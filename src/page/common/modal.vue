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
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.4);
  }
</style>
