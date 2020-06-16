<template>
  <el-form
    v-if="form"
    :model="form"
    label-width="200px">
    <yxb-upload
      style="display: none"
      ref="upload"
      type="slot"
      accept="image/*"
      :limit="1"
      :multiple="false"
      @confirm="_getUploadFileList"/>

    <el-divider>开放平台接入配置</el-divider>

    <el-form-item
      :label="form.appid.description"
      prop="appid">
      <el-input
        v-model="form.appid.value"
        :placeholder="form.appid.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.appid.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.appsecret.description"
      prop="appsecret">
      <el-input
        v-model="form.appsecret.value"
        :placeholder="form.appsecret.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.appsecret.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.token.description"
      prop="token">
      <el-input
        v-model="form.token.value"
        :placeholder="form.token.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.token.help_text"></div>
    </el-form-item>

    <el-form-item
      :label="form.encodingaeskey.description"
      prop="encodingaeskey">
      <el-input
        v-model="form.encodingaeskey.value"
        :placeholder="form.encodingaeskey.description"
        :clearable="true"/>
      <div class="help-block" v-html="form.encodingaeskey.help_text"></div>
    </el-form-item>

    <el-form-item size="small">
      <el-button
        type="primary"
        :loading="loading"
        @click="handleFormSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import util from '@/utils/util'
import { setPlatformList } from '@/api/config/setting'

export default {
  components: {
    'yxbUpload': () => import('@/components/yxb-upload')
  },
  data() {
    return {
      loading: false,
      form: null,
      platforms: []
    }
  },
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val) : ''
    }
  },
  methods: {
    // 获取上传文件
    _getUploadFileList(files, source) {
      if (!files.length) {
        return
      }

      const response = files[0].response
      if (!response || response.code !== 200) {
        return
      }

      this.form[source].value = ''
      if (source === 'qrcode_logo') {
        this.form[source].value += document.location.protocol
        this.form[source].value += '//'
      }

      this.form[source].value += response.data[0].url
    },
    // 设置配置数据
    setFormData(val) {
      this.form = val
      this.platforms = []

      // eslint-disable-next-line no-unused-vars
      for (const key in this.form.platform.value) {
        if (this.form.platform.value.hasOwnProperty(key)) {
          this.platforms.push({
            'key': key,
            'value': this.form.platform.value[key]
          })
        }
      }

      if (!this.form.allow_origin.value.length) {
        this.form.allow_origin.value = ['']
      }

      if (!this.platforms.length) {
        this.platforms = [{ 'key': null, 'value': '' }]
      }
    },
    // 确定修改
    handleFormSubmit() {
      let data = {}
      // eslint-disable-next-line no-unused-vars
      for (const index in this.form) {
        if (this.form.hasOwnProperty(index)) {
          data[index] = this.form[index].value
        }
      }

      let platform = {}
      // eslint-disable-next-line no-unused-vars
      for (const item of this.platforms) {
        platform[item.key] = item.value
      }
      this.$confirm('此操作将保存当前表单信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        data['platform'] = JSON.stringify(platform)
        setPlatformList(data)
          .then(() => {
            this.$message.success('操作成功')
          })
          .finally(() => {
            this.loading = false
          })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image >>> .el-image__error {
    line-height: 1.4;
  }
  .dynamic-domain {
    margin-right: 10px;
    width: 320px;
  }
  .dynamic-platform-key {
    margin-right: 10px;
    width: 120px;
  }
  .dynamic-platform-value {
    margin-right: 10px;
    width: 190px;
  }
</style>
