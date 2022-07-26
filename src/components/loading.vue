<template>
  <div class="loading"></div>
</template>

<script>
export default {
    name: 'loading'
}
</script>
<style scoped>
  .loading {
    position: fixed;
    left: 0;
    top: 0;
    background: url('../assets/codecat.jpeg') center center no-repeat rgba(0, 0, 0, 0);
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
</style>

