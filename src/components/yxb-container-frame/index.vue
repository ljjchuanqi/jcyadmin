<template>
  <yxb-container v-bind="$attrs">
    <iframe class="yxb-container-frame" :src="src" frameborder="0"></iframe>
  </yxb-container>
</template>

<script>
export default {
  name: 'yxb-container-frame',
  props: {
    src: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
  .yxb-container-frame {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
</style>
