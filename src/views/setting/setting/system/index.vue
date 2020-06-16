<template>
  <yxb-container :is-back-to-top="true">
    <div class="yxb-p">
      <el-tabs
        class="tab-box"
        v-model="activeName"
        v-loading="loading">
        <el-tab-pane
          label="系统配置"
          name="system_info">
          <system-info ref="system_info"/>
        </el-tab-pane>
        <el-tab-pane
          label="上传配置"
          name="upload">
          <upload ref="upload"/>
        </el-tab-pane>
         <el-tab-pane
          label="开放平台设置"
          name="open_Platform">
          <open-Platform ref="open_Platform"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </yxb-container>
</template>

<script>
import { getSettingList } from '@/api/config/setting'
import systemInfo from './components/system-info'
import upload from './components/upload'
import openPlatform from './components/open-Platform'

export default {
  name: 'setting-setting-system',
  components: {
    'system-info': systemInfo,
    'upload': upload,
    'openPlatform': openPlatform
  },
  data() {
    return {
      loading: false,
      activeName: 'system_info'
    }
  },
  watch: {
    activeName: {
      handler() {
        this.systemInit()
      }
    }
  },
  mounted() {
    this.systemInit()
  },
  methods: {
    systemInit() {
      this.loading = true
      getSettingList(this.activeName)
        .then(res => {
          this.$refs[this.activeName].setFormData(res.data)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-box {
    padding: 5px 10px;
    background-color: #FFF;
  }
  .tab-box /deep/ .help-block {
    color: $color-info;
    font-size: 12px;
    line-height: 2;
    margin-bottom: -12px;
  }
</style>
