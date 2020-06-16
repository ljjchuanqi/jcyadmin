<template>
  <yxb-page-header v-bind="$attrs" v-on="$listeners" ref="pageheader"></yxb-page-header>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
    }
  },
  methods: {
    handleFormSubmit() {
      this.$refs.pageheader.handleFormSubmit()
    }
  }
}
</script>
