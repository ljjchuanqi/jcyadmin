<template>
  <yxb-container :is-back-to-top="true" parent-path="goods-admin-list">
    {{goods_id}}
  </yxb-container>
</template>

<script>
export default {
  props: {
    goods_id: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
