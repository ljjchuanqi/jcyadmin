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
              item.type == 1"
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
          <el-button v-if="item.is_sign===1" type="text" @click="handleQianMingDialogVisble(item.name)"
            >编辑用户签名区域</el-button
          >
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
    <!-- 签名对话框 -->
    <el-dialog
      title="编辑签名"
      :visible.sync="isQianMingDialogVisble"
      width="700px"
      :append-to-body="true"
      @close="isQianMingDialogVisble = false"
    >
      <div class="content">
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="margin-bottom:20px;"
        >
          <el-col :span="12">拖动签字按钮进行定位</el-col>
          <el-col :span="12">
            <div class="m_qianziBtn">
              <a href="###" class="m_addQianzi" @click="addQianzi">添加签字</a>
            </div>
          </el-col>
        </el-row>
        <div class="m_qianMingArea" ref="parent_area">
          <img style="width:100%;" :src="curImg" alt="" />
          <vue-draggable-resizable
            v-for="(item, index) in signs"
            :key="index"
            class="m_draggable qianzi"
            :w="defaultQianziWidth"
            :h="defaultQianziHeight"
            @activated="onActivated(index)"
            @dragging="onDrag"
            @resizing="onResize"
            :parent="true"
          >
            <p>签字</p>
          </vue-draggable-resizable>
          <!-- <a href="javascript:;" class="qianzi" v-for="(item,index) in qianziBtns" :key="index">签字</a> -->
        </div>
      </div>
      <span slot="footer">
        <el-button @click="isQianMingDialogVisble = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitQianzi">确 定</el-button>
      </span>
    </el-dialog>

    <!-- /签名对话框 -->
  </div>
</template>

<script>
import util from '@/utils/util'
import _ from 'lodash'
import VueDraggableResizable from 'vue-draggable-resizable'// 拖拽插件
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'// optionally import default styles

export default {
  components: {
    yxbUpload: () => import('@/components/yxb-upload'),
    VueDraggableResizable
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
      field_label_names: ['姓名', '名字'],
      field_label_phones: ['手机', '联系人电话', '电话', '联系人手机'],
      field_label_idCards: ['身份证', '身份证号', '身份证号码'],
      defaultQianziWidth: 90,
      defaultQianziHeight: 40,
      signs: [],
      curImg: '', // 当前的图片
      optionsMetaShow: [],
      isQianMingDialogVisble: false,
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
  watch: {
    headerData: {
      handler() {
        // 把name如:mfield_key_399组装成filed_99(form_id)_399
        _(this.headerData).forEach((item, index) => {
          _.forOwn(item, (value, key) => {
            if (key === 'name') {
              if (item[key].indexOf('mfield') !== -1) {
                let str = item[key]
                let arr = str.split('_')
                arr[0] = 'field'
                arr[1] = this.$route.query.id
                let result = arr.join('_')
                item[key] = result
              }
            }
          })
        })

        // 过滤姓名，手机，身份证号码,添加isRepeatField字段
        // _(this.headerData).forEach((item, index) => {
        //   let name = item['name']
        //   if (name.indexOf('field') !== -1) {
        //     this.isRepeatField(item)
        //   }
        // })
      },
      immediate: true
    }
  },
  methods: {
    isRepeatField(item) {
      if (_.includes(this.field_label_names, item['label'])) {
        item.isRepeatField = 1
      }
      if (_.includes(this.field_label_phones, item['label'])) {
        item.isRepeatField = 1
      }
      if (_.includes(this.field_label_idCards, item['label'])) {
        item.isRepeatField = 1
      }
    },
    // 签字调节大小
    onResize(x, y, width, height) {
      this.signs[this.curQianziIndex].left =
        (x / this.parent_area_width) * 100 + '%'
      this.signs[this.curQianziIndex].top =
        (y / this.parent_area_height) * 100 + '%'
      this.signs[this.curQianziIndex].width =
        (width / this.parent_area_width) * 100 + '%'
      this.signs[this.curQianziIndex].height =
        (height / this.parent_area_height) * 100 + '%'
      debugger
    },
    // 签字拖拽位置
    onDrag(x, y) {
      this.signs[this.curQianziIndex].left =
        (x / this.parent_area_width) * 100 + '%'
      this.signs[this.curQianziIndex].top =
        (y / this.parent_area_height) * 100 + '%'
      this.signs[this.curQianziIndex].width =
        (this.defaultQianziWidth / this.parent_area_width) * 100 + '%'
      this.signs[this.curQianziIndex].height =
        (this.defaultQianziHeight / this.parent_area_height) * 100 + '%'
    },
    // 当前签字按钮的索引
    onActivated(index) {
      this.curQianziIndex = index
    },
    // 添加签字
    addQianzi() {
      let obj = {
        left: 0,
        top: 0,
        width: this.defaultQianziWidth,
        height: this.defaultQianziHeight
      }
      let oParent = this.$refs.parent_area
      this.parent_area_width = oParent.offsetWidth
      this.parent_area_height = oParent.offsetHeight
      this.signs.push(obj)
    },
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
    },
    // 打开签字编辑对话框
    handleQianMingDialogVisble(name) {
      if (this.form[name] === '' || this.form[name] === undefined) {
        this.$message({
          message: '请先上传图片',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      let url = this.form[name]
      this.cur_form_name = name // 当前编辑的表单字段
      this.isQianMingDialogVisble = true
      this.curImg = `http://${url}`
    },
    // 保存签字信息
    handleSubmitQianzi() {
      let obj = {}
      obj.url = this.form[this.cur_form_name]
      obj.signs = this.signs // 签字信息
      let resultStr = `${obj.url}|`
      let that = this
      _(this.signs).forEach((item, index) => {
        let str = ''
        _.forOwn(item, (value, key) => {
          str = str + `${key}:${value};`
        })
        if (that.signs.length - 1 === index) {
          resultStr = resultStr + str
        } else {
          resultStr = resultStr + str + '|'
        }
      })
      this.form[this.cur_form_name] = resultStr// 数据格式url|left:5%;top:5%;width:10%;height:10%;

      this.isQianMingDialogVisble = false
      this.$message({
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m_qianMingArea {
  border: 1px solid #999;
  position: relative;
}
.qianzi {
  border: 1px solid #999;
  text-align: center;
  position: absolute;
  top: 10px;
  background-color: #fff;
  left: 10px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m_addQianzi {
  width: 90px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #999;
  text-align: center;
  background-color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 16px;
  color: #333;
  display: inline-block;
}
.m_draggable {
  left: 0;
  top: 0;
}
</style>
