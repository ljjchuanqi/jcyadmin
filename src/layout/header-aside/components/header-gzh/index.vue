<template>
  <div>
    <el-tooltip effect="dark" content="切换公众号" placement="bottom">
      <el-button class="yxb-ml-0 yxb-mr btn-text can-hover" type="text" @click="dialogVisible = true">
        <yxb-icon name="exchange" style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
      title="切换公众号"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false">
      <yxb-gzh-list style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
import gzhList from './components/yxb-gzh-list'
export default {
  components: {
    'yxb-gzh-list': gzhList
  },
  data() {
    return {
      loading: true,
      dialogVisible: false
    }
  },
  methods: {

  }
}
</script>
