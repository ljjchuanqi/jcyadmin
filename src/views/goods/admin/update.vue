<template>
  <yxb-container :is-back-to-top="true" parent-path="goods-admin-list">
  </yxb-container>
</template>

<script>
export default {
  name: 'goods-admin-update',
  props: {
    goods_id: {
      type: [Number, String],
      required: true
    }
  }
}
</script>
