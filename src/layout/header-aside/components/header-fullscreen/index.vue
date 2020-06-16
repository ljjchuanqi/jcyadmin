<template>
  <el-tooltip effect="dark" :content="active ? '退出全屏' : '全屏'" placement="bottom">
    <el-button class="yxb-mr btn-text can-hover" type="text" @click="toggle">
      <yxb-icon v-if="active" name="compress"/>
      <yxb-icon v-else name="arrows-alt" style="font-size: 16px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('ldyxb/fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('ldyxb/fullscreen', [
      'toggle'
    ])
  }
}
</script>
