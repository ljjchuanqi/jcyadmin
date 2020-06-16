<template>
  <yxb-container>
    <yxb-page-cover
      title="ldyxb"
      sub-title="">
      <!-- <img src="~@/assets/image/logo@2x.png" alt="logo"> -->
      <div slot="footer" class="index-btn-group">

      </div>
    </yxb-page-cover>
  </yxb-container>
</template>

<script>
import yxbpagecover from './components/yxb-page-cover'

export default {
  components: {
    'yxb-page-cover': yxbpagecover
  }
}
</script>

<style lang="scss" scoped>
  .index-btn-group {
    color: $color-text-placehoder;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
        cursor: pointer;
      }
    }
  }
</style>
