<template>
  <div class="yxb-page-cover">
    <div class="yxb-page-cover__logo">
      <slot/>
    </div>
    <!-- <p class="yxb-page-cover__title">{{title}} {{$version}}</p>
    <p class="yxb-page-cover__sub-title yxb-mt-0">{{subTitle}}</p>
    <p class="yxb-page-cover__build-time">构建时间 {{$buildTime}}</p> -->
    <slot name="footer"/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Title'
    },
    subTitle: {
      type: String,
      required: false,
      default: 'subTitle'
    }
  }
}
</script>

<style lang="scss" scoped>
.yxb-page-cover {
  @extend %full;
  //@extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .yxb-page-cover__logo {
    img {
      width: 200px;
    }
  }
  .yxb-page-cover__title {
    color: $color-text-main;
  }
  .yxb-page-cover__sub-title {
    color: $color-text-sub;
  }
  .yxb-page-cover__build-time {
    margin: 0;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 12px;
    color: $color-text-placehoder;
  }
}
</style>
