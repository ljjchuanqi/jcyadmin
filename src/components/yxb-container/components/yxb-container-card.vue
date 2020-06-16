<template>
  <div class="yxb-container-card">
    <div v-if="$slots.header" class="yxb-container-card__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="yxb-container-card__body" ref="body">
      <div class="yxb-container-card__body-card">
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" class="yxb-container-card__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import normal from './mixins/normal'

export default {
  name: 'yxb-container-card',
  mixins: [normal],
  mounted() {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy() {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
