<template>
  <div>
    <yxb-upload
      style="display: none"
      ref="upload"
      type="slot"
      accept="image/*"
      :limit="1"
      :multiple="false"
      @confirm="_getUploadFileList"
    />
    <el-form :model="form" label-width="96px" ref="form">
      <template v-for="(item, index) in headerData">
        <el-form-item
          :label="item.label"
          :prop="item.name"
          :rules="[{ required: true, message: '内容不能为空' }]"
          :key="index"
          v-if="
            ((dialogStatus == 'create' && item.is_add) ||
              dialogStatus == 'update') &&
              item.type == 1
          "
        >
          <span v-if="dialogStatus == 'update' && !item.is_edit">{{
            form[item.name]
          }}</span>
          <el-input
            v-else
            v-model.trim="form[item.name]"
            :placeholder="'请输入' + item.label"
            @keyup.enter.native="handleFormSubmit(true)"
            style="width: 180px;"
            :clearable="true"
          />
        </el-form-item>

        <el-form-item
          :label="item.label"
          :prop="item.name"
          :rules="
            item.is_must ? [{ required: true, message: '内容不能为空' }] : []
          "
          :key="index"
          v-else-if="
            ((dialogStatus == 'create' && item.is_add) ||
              dialogStatus == 'update') &&
              item.type == 2
          "
        >
          <el-select
            :disabled="dialogStatus == 'update' && !item.is_edit"
            v-model="form[item.name]"
            :placeholder="'请选择' + item.label"
            style="width: 180px;"
          >
            <el-option
              :label="v"
              :value="parseInt(i)"
              v-for="(v, i) in item.option"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          :label="item.label"
          :prop="item.name"
          :rules="
            item.is_must ? [{ required: true, message: '内容不能为空' }] : []
          "
          :key="index"
          v-else-if="
            ((dialogStatus == 'create' && item.is_add) ||
              dialogStatus == 'update') &&
              item.type == 3
          "
        >
          <el-input
            :disabled="dialogStatus == 'update' && !item.is_edit"
            v-model="form[item.name]"
            :placeholder="'上传' + item.label"
            :clearable="true"
          >
            <template slot="prepend">
              <el-popover
                v-if="form[item.name]"
                width="150"
                placement="top"
                trigger="hover"
              >
                <div class="popover-image">
                  <el-image
                    :src="form[item.name] | getPreviewUrl"
                    @click.native="$preview(form[item.name])"
                    fit="fill"
                  />
                </div>
                <yxb-icon slot="reference" name="image" />
              </el-popover>
            </template>
            <el-button
              v-if="
                dialogStatus == 'create' ||
                  (dialogStatus == 'update' && item.is_edit)
              "
              slot="append"
              @click="$refs.upload.handleUploadDlg(item.name)"
            >
              <yxb-icon name="upload" />
            </el-button>
          </el-input>
        </el-form-item>

        <el-form-item
          :label="item.label"
          :prop="item.name"
          :rules="
            item.is_must ? [{ required: true, message: '内容不能为空' }] : []
          "
          :key="index"
          v-else-if="
            ((dialogStatus == 'create' && item.is_add) ||
              dialogStatus == 'update') &&
              item.type == 4
          "
        >
          <span v-if="dialogStatus == 'update' && !item.is_edit">{{
            form[item.name]
          }}</span>
          <el-date-picker
            v-else
            :disabled="dialogStatus == 'update' && !item.is_edit"
            v-model="form[item.name]"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          :label="item.label"
          :prop="item.name"
          :rules="
            item.is_must ? [{ required: true, message: '内容不能为空' }] : []
          "
          :key="index"
          v-else-if="
            ((dialogStatus == 'create' && item.is_add) ||
              dialogStatus == 'update') &&
              item.type == 5
          "
        >
          <span v-if="dialogStatus == 'update' && !item.is_edit">{{
            form[item.name]
          }}</span>
          <el-date-picker
            v-else
            v-model="form[item.name]"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          :label="item.label"
          :prop="item.name"
          :rules="[{ required: true, message: '内容不能为空' }]"
          :key="index"
          v-if="
            ((dialogStatus == 'create' && item.is_add) ||
              dialogStatus == 'update') &&
              item.type == 7
          "
        >
          <div
            v-if="dialogStatus == 'update' && !item.is_edit"
            v-html="form[item.name]"
          ></div>
          <quill-editor
            v-model="form[item.name]"
            ref="richAnalysis"
          ></quill-editor>
        </el-form-item>
        <el-form-item
          :label="item.label"
          :prop="item.name"
          :rules="
            item.is_must ? [{ required: true, message: '内容不能为空' }] : []
          "
          :key="index"
          v-else-if="
            ((dialogStatus == 'create' && item.is_add) ||
              dialogStatus == 'update') &&
              item.type == 8
          "
        >
          <span v-if="dialogStatus == 'update' && !item.is_edit">{{
            form[item.name]
          }}</span>
          <el-input
            v-else
            v-model.trim="form[item.name]"
            type="number"
            min="0"
            placeholder="请输入内容"
            style="width: 180px;"
            onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          />
        </el-form-item>
        <el-form-item
          :label="item.label"
          :prop="item.name"
          :rules="
            item.is_must ? [{ required: true, message: '内容不能为空' }] : []
          "
          :key="index"
          v-else-if="
            ((dialogStatus == 'create' && item.is_add) ||
              dialogStatus == 'update') &&
              item.type == 9
          "
        >
          <span v-if="dialogStatus == 'update' && !item.is_edit">{{
            form[item.name]
          }}</span>
          <div v-else>
            <el-input
              v-if="dialogStatus == 'update' && !item.is_edit"
              :disabled="dialogStatus == 'update' && !item.is_edit"
              v-model.trim="form[item.name]"
              type="text"
              style="width: 180px;"
            />
            <el-select
              v-else
              v-model="form[item.name]"
              collapse-tags
              :placeholder="'请选择' + item.label"
              @visible-change="change(item)"
            >
              <div class="el-input" style="width:90%;margin-left:5%;">
                <input
                  type="text"
                  :placeholder="'请输入' + item.label"
                  class="el-input__inner"
                  v-model.trim="item.dropDownValue"
                  @input="dropDownSearch(item)"
                />
              </div>
              <el-option
                v-for="(v, i) in optionsMetaShow"
                :value="parseInt(v.id)"
                :label="v.name"
                :key="i"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import util from '@/utils/util'

export default {
  components: {
    yxbUpload: () => import('@/components/yxb-upload')
  },
  props: {
    dialogStatus: {
      type: String,
      default: ''
    },
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
        serverUrl:
          'http://jcy.w.qzldkj.com/interface/v3/upload/method/add.upload.list',
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
  mounted() {},
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

