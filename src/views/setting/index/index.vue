<template>
  <yxb-container>
    <page-navi class="yxb-m" v-model="root"/>
  </yxb-container>
</template>

<script>
export default {
  name: 'setting-index',
  components: {
    'PageNavi': () => import('@/layout/header-aside/components/header-navi')
  },
  data() {
    return {
      root: '/setting'
    }
  }
}
</script>
