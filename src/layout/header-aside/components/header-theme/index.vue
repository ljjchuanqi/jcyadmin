<template>
  <div>
    <el-tooltip effect="dark" content="主题" placement="bottom">
      <el-button class="yxb-ml-0 yxb-mr btn-text can-hover" type="text" @click="dialogVisible = true">
        <yxb-icon name="diamond" style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
      title="主题"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false">
      <yxb-theme-list style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
import themeList from './components/yxb-theme-list'
export default {
  components: {
    'yxb-theme-list': themeList
  },
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
