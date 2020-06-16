<template>
  <svg aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script>
export default {
  name: 'yxb-icon-svg',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return `#yxb-${this.name}`
    }
  }
}
</script>
