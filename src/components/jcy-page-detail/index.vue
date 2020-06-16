<template>
     <div>
      <yxb-upload
      style="display: none"
      ref="upload"
      type="slot"
      accept="image/*"
      :limit="1"
      :multiple="false"
      @confirm="_getUploadFileList"/>
       <el-form
        :model="form"
        label-width="120px"
        ref="form">
           <template v-for="(item,index) in headerData">

             <el-form-item :label="item.label+'：'" :key="index" v-if="item.is_list===1 && parseInt(item.type) === 2">
                <span style="padding-left:15px">{{item.option[form[item.name]]}}</span>
            </el-form-item>
            <el-form-item :label="item.label+'：'" :key="index"  v-else-if="item.is_list===1 && parseInt(item.type) === 3">
              <span v-if="!form[item.name]">暂无</span>
             <template v-for="(v,i) in form[item.name].split(',')">
               <a target="_blank" :href="v" :key="i" class="img-wrap">
                 <img :src="v"/>
                </a>
              </template>

              <!-- <el-input
                    :disabled="true"
                    v-model="form[item.name]"
                    :placeholder="'上传'+item.label"
                    :clearable="true">
                    <template slot="prepend">
                      <el-popover
                        v-if="form[item.name]"
                        width="150"
                        placement="top"
                        trigger="hover">
                        <div class="popover-image">
                          <el-image
                            :src="form[item.name] | getPreviewUrl"
                            @click.native="$preview(form[item.name])"
                            fit="fill"/>
                        </div>
                        <yxb-icon slot="reference" name="image"/>
                      </el-popover>
                    </template>
                  </el-input> -->
            </el-form-item>
            <el-form-item :label="item.label+'：'" :key="index" v-else-if="item.is_list===1 && parseInt(item.type) === 7">
                <span style="padding-left:15px" v-html="form[item.name]"></span>
            </el-form-item>
            <el-form-item :label="item.label+'：'" :key="index" v-else-if="item.is_list ===1">
                <span style="padding-left:15px">{{form[item.name]}}</span>
            </el-form-item>
          </template>
      </el-form>

   </div>
</template>

<script>
import util from '@/utils/util'
export default {
  components: {
    'yxbUpload': () => import('@/components/yxb-upload')
  },
  props: {

    dialogLoading: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    },
    headerData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      optionsMetaShow: [],
      myConfig: {
      // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        // http://35.201.165.105:8000/controller.php
        serverUrl: 'http://jcy.w.qzldkj.com/interface/v3/upload/method/add.upload.list',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/'
      }
    }
  },
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'gzh_img') : ''
    }
  },
  methods: {
    _getUploadFileList(files, source) {
      if (!files.length) {
        return
      }
      const response = files[0].response
      if (!response || response.code !== 200) {
        return
      }
      this.$set(this.form, source, response.data[0].url)
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    startValidate(val) {
      this.$nextTick(() => {
        this.$refs.form.validate(val)
      })
    },
    dropDownSearch(item) {
      item.dropDownValue = item.dropDownValue || ''
      this.optionsMetaShow = item.selects
      this.optionsMetaShow = item.selects.filter(function(v) {
        return v.name.indexOf(item.dropDownValue) >= 0
      })
    },
    change(item) {
      item.dropDownValue = ''
      this.optionsMetaShow = item.selects
    }

  }
}
</script>
<style scoped>
.img-wrap{
  overflow: hidden;
  margin:10px
}
</style>
