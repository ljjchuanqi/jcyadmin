<template>
  <yxb-page-header v-bind="$attrs" :query-obj="setqueryobj" v-on="$listeners" ref="pageheader"></yxb-page-header>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      queryobj: {}
    }
  },
  computed: {
    setqueryobj() {
      console.log(this.queryobj)
      return this.queryobj
    }
  },
  created() {
    // if (this.$route.query.id) {
    //   this.queryobj.scene_id = this.$route.query.id
    // }
  },
  methods: {
    handleFormSubmit() {
      this.$refs.pageheader.handleFormSubmit()
    }
  }
}
</script>
