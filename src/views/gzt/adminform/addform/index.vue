<template>
  <yxb-container :is-back-to-top="true">
    <div class="yxb-container-full__header">
      <el-form
        :rules="rules"
        :inline="true"
        :model="formInline"
        label-width="100px"
        label="left"
        class="demo-form-inline"
      >
        <el-row :gutter="10">
          <el-form-item prop="title" label="标题">
            <el-input
              v-model.trim="formInline.title"
              placeholder="请输入表单标题"
              style="width: 250px;"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="描述" prop="desc">
            <el-input
              type="textarea"
              v-model.trim="formInline.desc"
              style="width: 250px;"
            ></el-input>
          </el-form-item>
        </el-row>

        <!-- <el-row :gutter="10">
        <el-form-item prop="write_condition" label="填写条件">
           <el-checkbox v-model="formInline.write_condition">仅认证用户可填</el-checkbox>
        </el-form-item>
        </el-row> -->
        <!-- <el-row :gutter="10">
        <el-form-item label="是否开启" >
        <el-select v-model="formInline.state" placeholder="请选择">
                  <el-option label="开启" :value="1"></el-option>
                   <el-option label="草稿" :value="0"></el-option>
                </el-select>
          </el-form-item>
        </el-row> -->
        <el-row :gutter="10">
          <el-form-item label="是否发布">
            <el-switch
              v-model="formInline.state"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
        </el-row>
        <!--  -->
        <el-row :gutter="10">
          <el-form-item label="前置提示状态">
            <el-switch
              v-model="formInline.tips_status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
        </el-row>
        <el-row :gutter="10" v-if="formInline.tips_status == 1">
          <el-form-item label="前置提示内容" >
            <!-- ueditor -->
            <vue-ueditor-wrap
              style="line-height:1.2"
              v-model="formInline.tips_content"
              @ready="readyUeditor"
              :config="ueditorConfig"
              @beforeInit="addCustomDialog"
            ></vue-ueditor-wrap>
            <!-- /ueditor -->
            <el-button
              style="margin-top:20px;"
              v-show="false"
              class="picUpload"
              @click="$refs.upload.handleUploadDlg()"
            >
              <yxb-icon name="upload" />图片上传
            </el-button>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="表单内容:" style="margin: 0;"></el-form-item>
          <div class="padding">
            <el-table :data="tableData" border row-key="number">
              <el-table-column
                v-for="(item, index) in col"
                :key="`col_${index}`"
                :label="item.label"
                align="center"
              >
                <template slot-scope="scope">
                  <div
                    v-if="
                      col[index].prop !== 'id' &&
                        col[index].prop !== 'operate' &&
                        col[index].prop !== 'type' &&
                        col[index].prop !== 'is_must' &&
                        col[index].prop !== 'is_show'
                    "
                  >
                    {{ scope.row[col[index].prop] }}
                  </div>
                  <div v-if="col[index].prop === 'id'">
                    <i class="fa fa-align-justify move-tree"></i>
                  </div>
                  <div v-if="col[index].prop === 'type'">
                    <span>{{ scope.row[col[index].prop] | setTypeName }}</span>
                  </div>
                  <div v-if="col[index].prop === 'is_must'">
                    <span v-if="scope.row[col[index].prop] === 1">必填</span>
                    <span v-else>选填</span>
                  </div>
                  <div v-if="col[index].prop === 'is_show'">
                    <el-switch
                      v-model="scope.row[col[index].prop]"
                      :active-value="1"
                      :inactive-value="0"
                    >
                    </el-switch>
                  </div>
                  <div v-if="col[index].prop === 'operate'">
                    <el-button
                      @click="handleUpdate(scope.$index)"
                      size="small"
                      type="text"
                      >编辑</el-button
                    >
                    <el-button
                      @click="handleDel(scope.$index)"
                      v-if="
                        !scope.row.disabled_delete && !scope.row.foreign_key
                      "
                      size="small"
                      type="text"
                      style="color:#F56C6C"
                    >
                      删除
                    </el-button>
                  </div>
                </template>
                <!--  -->
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="新增表单:" style="margin: 0;">
            <el-button
              class="mar-tb05"
              plain
              v-for="item in options"
              :key="item.value"
              @click="handleAddFormLine(item.value)"
              >{{ item.label }}</el-button
            >
          </el-form-item>
        </el-row>
        <br />
        <el-row :gutter="10">
          <el-form-item label="截止时间" prop="stop_time" style="width: 350px;">
            <el-date-picker
              v-model.trim="formInline.stop_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="是否显示开柜">
            <el-switch
              v-model="formInline.show_cabinet"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="是否需要用户注册信息">
            <el-switch
              v-model="formInline.need_login"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="审核条件">
            <el-checkbox
              v-model="formInline.need_audit"
              :true-label="1"
              :false-label="0"
              >需人工审核</el-checkbox
            >
            <el-input
              v-if="formInline.need_audit === 1"
              v-model.trim="formInline.unaudit_tips"
              placeholder="填写审核未通过提示。如：审核未通过，请根据错误提示重新填写。"
              style="width: 450px;margin-right:10px"
            ></el-input>
            <el-checkbox
              v-if="formInline.need_audit === 1"
              v-model="formInline.is_sms"
              :true-label="1"
              :false-label="0"
              >开启短信提醒</el-checkbox
            >
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="短信模板" prop="msgtemplate">
            <div
              class="msgTpl-wrap"
              v-for="(item, index) in messageTemplateData"
              :key="item.type"
            >
              <div class="msgTpl-wrap-l">
                <p></p>
                <p class="msgTpl-wrap-subtit" v-if="item.type === 1">
                  类型：提交后，通知用户
                </p>
                <p class="msgTpl-wrap-subtit" v-if="item.type === 2">
                  类型：提交后，通知管理员
                </p>
                <p class="msgTpl-wrap-subtit" v-if="item.type === 3">
                  类型：审核通过后，通知用户
                </p>
                <p class="msgTpl-wrap-subtit" v-if="item.type === 4">
                  类型：审核未通过，通知用户
                </p>
                <p class="msgTpl-wrap-subtit" v-if="item.type === 5">
                  类型：开柜通知
                </p>
              </div>
              <div
                class="msgTpl-wrap-m"
                @click="handleGetSmsTemplateDetail(index)"
              >
                <yxb-icon name="edit" />
              </div>
              <div class="msgTpl-wrap-r" @click="handleDelSmsTemplate(index)">
                <yxb-icon name="close" />
              </div>
            </div>
            <el-button @click="HandleAddSmsTemplate"
              ><yxb-icon class="" name="plus" />添加模板</el-button
            >
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="提交次数">
            <el-popover
              placement="bottom-end"
              width="200"
              trigger="hover"
              title="提示"
            >
              <div
                class="popover-content"
                v-html="'默认次数为0，为0时代表无限制次数'"
              ></div>
              <el-button class="notice" size="20" slot="reference">
                <yxb-icon name="question-circle-o" />
              </el-button>
            </el-popover>
            <template>
              <span class="el-form-item__label">审核通过</span>
              <el-input-number
                v-model.trim="formInline.insert_times"
                :min="0"
                label=""
                style="margin-right:30px"
              ></el-input-number>
              <!-- <el-input
                  v-model.trim="formInline.insert_times"
                  placeholder="填写审核未通过提示。如：审核未通过，请根据错误提示重新填写。"
                  style="width: 100px;margin-right:30px"
                ></el-input> -->
            </template>
            <template v-if="formInline.need_audit === 1">
              <span class="el-form-item__label">审核不通过</span>
              <el-input-number
                v-model.trim="formInline.update_times"
                :min="0"
                label=""
              ></el-input-number>
              <!-- <el-input
                      v-model.trim="formInline.update_times"
                      placeholder="填写审核未通过提示。如：审核未通过，请根据错误提示重新填写。"
                      style="width: 100px;margin-right:30px"
                    ></el-input> -->
            </template>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item
            label="重新提交类型"
            prop="msgtemplate"
            v-if="formInline.need_audit === 1"
          >
            <template>
              <el-radio v-model="formInline.is_repeat_post" :label="0"
                >修改原表单</el-radio
              >
              <el-radio v-model="formInline.is_repeat_post" :label="1"
                >创建新表单</el-radio
              >
            </template>
          </el-form-item>
          <!-- <el-form-item label="重新提交类型" prop="msgtemplate" v-else>
              <template>
                <el-radio v-model="formInline.is_repeat_post" :label="1">审核未通过时重新填写</el-radio>
                <el-radio v-model="formInline.is_repeat_post" :label="0">审核未通过时修改</el-radio>
              </template>
            </el-form-item> -->
        </el-row>
        <el-row :gutter="10">
          <el-form-item>
            <el-button
              type="primary"
              :loading="btnloading"
              @click="handleFormSubmit"
              >提交</el-button
            >
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- 编辑option -->
    <el-dialog
      title="表单内容"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      close="clearoptinval"
    >
      <!-- <el-form>
          <el-form-item label="option">
            <el-input type="textarea" v-model.trim="dialogvalue" placeholder="请填写，注意：type为2时填写json字符串，type为9时填写请求后缀字符串"></el-input>
          </el-form-item>
        </el-form> -->
      <form-detail :form="form" :treeSetData="treeSetData" ref="pageedit">
      </form-detail>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          v-if="dialogStatus === 'add'"
          @click="updateFormOption"
          >确 定</el-button
        >
        <el-button
          type="primary"
          v-if="dialogStatus === 'update'"
          @click="saveFormOption"
          >保 存</el-button
        >
      </div>
    </el-dialog>
    <!-- 图片上传 -->
    <yxb-upload
      style="display: none"
      ref="upload"
      type="slot"
      accept="image/*"
      :limit="1"
      :multiple="false"
      @confirm="_getUploadFileList"
    />
    <!-- /图片上传 -->
    <!-- 短信模板 -->
    <el-dialog
      title="短信模板"
      width="900px"
      :close-on-click-modal="false"
      :visible.sync="dialogMsgTplVisible"
    >
      <div class="content">
        <div class="m_container">
          <div class="box">
            <el-form :rules="rules" :model="formMessage" label-width="100px">
              <el-row>
                <el-form-item name="type" label="通知类型:">
                  <el-select v-model="formMessage.type" placeholder="请选择">
                    <el-option
                      v-for="item in messageTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item name="title" label="模板名称:">
                  <el-input
                    v-model.trim="formMessage.title"
                    placeholder="请输入模板名称"
                  />
                </el-form-item>
                <el-form-item name="signname" label="头部签名:">
                  <el-input
                    v-model.trim="formMessage.signname"
                    placeholder="请输入头部签名"
                    :clearable="true"
                  />
                </el-form-item>
                <el-form-item name="msisdn" label="发送对象:">
                  <el-input
                    v-model.trim="formMessage.msisdn"
                    placeholder="请输入发送对象"
                    @blur="handleGetTabindex1"
                    :clearable="true"
                  />
                </el-form-item>
                <div class="m_appendTxt">
                  <span class="desc">可插入动态内容：</span>
                  <span
                    class="var"
                    @click="insertVariable1(index)"
                    v-for="(item, index) in variable1"
                    :key="index"
                    >#{{ item }}#</span
                  >
                </div>
                <el-form-item name="template" label="短信内容:">
                  <el-input
                    type="textarea"
                    :rows="6"
                    maxlength="200"
                    v-model.trim="formMessage.template"
                    placeholder="请输入短信内容"
                    @blur="handleGetTabindex2"
                    @input="computeMessageCount"
                    :clearable="true"
                  />
                  <div class="m_txt">
                    {{
                      templateNumOfWords == ""
                        ? formMessage.template.length
                        : templateNumOfWords
                    }}/200（每65字占用一条，共占用 {{ messageCount }} 条）
                  </div>
                </el-form-item>
                <div class="m_appendTxt">
                  <span class="desc">可插入动态内容：</span>
                  <span
                    class="var"
                    @click="insertVariable2(index)"
                    v-for="(item, index) in variable2"
                    :key="index"
                    >#{{ item }}#</span
                  >
                </div>
              </el-row>
            </el-form>
          </div>
          <div class="box">
            <img src="@/assets/image/phone_cover.png" alt="" />
            <div class="m_duanxin">
              <h3>
                <span class="signname" v-if="formMessage.signname === ''"
                  >【短信签名】</span
                >
                <span class="signname" v-else
                  >【{{ formMessage.signname }}】</span
                >
                <span class="template" v-if="formMessage.template === ''"
                  >短信内容</span
                >
                <span class="template" v-else>{{ formMessage.template }}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary">测试发送</el-button> -->
        <el-button
          type="primary"
          :loading="btnloading"
          @click="HandleSmsTemplate"
          >保存模板</el-button
        >
        <el-button @click="dialogMsgTplVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- /短信模板 -->
    <!-- 预约表单 -->
    <forward-form></forward-form>
    <!-- /预约表单 -->
  </yxb-container>
</template>

<script>
// 工具栏配置
import { mapState, mapGetters } from 'vuex'
import Sortable from 'sortablejs'
import formDetail from '../components/formdetail'
import forwardForm from './forward-form/index' // 预约表单
import VueUeditorWrap from 'vue-ueditor-wrap'
import {
  addScene,
  editScene,
  getDetail,
  getRegisterList,
  addSmsTemplate,
  editSmsTemplate,
  getSmsTemplateDetail,
  delSmsTemplate
} from '@/api/gzt/adminform'

var _that
export default {
  components: {
    VueUeditorWrap,
    formDetail,
    forwardForm,
    yxbUpload: () => import('@/components/yxb-upload')
  },
  data() {
    return {
      id: '',
      type: 1,
      dialogFormVisible: false,
      dialogMsgTplVisible: false,
      dialogvalue: '',
      dialogindex: '',
      btnloading: false,
      formInline: {
        msgtemplate: '',
        title: '',
        desc: '',
        formtype: '',
        stop_time: '',
        fields: [],
        write_condition: '',
        need_audit: 0,
        is_sms: 0,
        unaudit_tips: '', // 审核未通过提示
        is_repeat_post: 1, // 多次提交？ 0不允许 1允许 需要审核时 1审核未通过时重新填写 0审核未通过时修改
        audit_state: 1, // 审核状态 1未审核 2已通过 3未通过
        state: 1,
        update_times: 0,
        insert_times: 0,
        sms_set: [] // 短信模板
      },
      selects: [],
      optionsMetaShow: [],
      options: [
        { value: 1, label: '单行文本' },
        { value: 2, label: '多行文本' },
        { value: 3, label: '数字文本' },
        { value: 4, label: '手机短信验证' },
        { value: 5, label: '图形验证码' },
        { value: 6, label: '日期' },
        { value: 7, label: '单选' },
        { value: 8, label: '多选' },
        { value: 9, label: '下拉' },
        { value: 10, label: '图片上传' },
        { value: 11, label: '图片(二维码上传)' },
        { value: 12, label: '附件上传' },
        { value: 13, label: '级联选择器' },
        { value: 14, label: '编辑器' },
        { value: 15, label: '预约表单' }
      ],
      col: [
        {
          label: '拖动',
          prop: 'id'
        },
        {
          label: '类型',
          prop: 'type'
        },
        {
          label: '必填/选填',
          prop: 'is_must'
        },
        {
          label: '字段名称',
          prop: 'name'
        },
        {
          label: '填写提示',
          prop: 'placeholder'
        },
        {
          label: '列表显示',
          prop: 'is_show'
        },
        {
          label: '操作',
          prop: 'operate'
        }
      ],
      tableData: [],
      rules: {
        title: [{ required: true, message: '请输入表单标题', trigger: 'blur' }]
      },
      form: {},
      number: 0,
      dialogStatus: '',
      updateIndex: '',
      treeSetData: {},
      // 短信模板数据
      messageTemplateData: [],
      // 短信模板
      formMessage: {
        type: 0,
        title: '',
        signname: '',
        template: '',
        msisdn: ''
      },
      // 短信通知类型
      messageTypeOptions: [
        {
          value: 0,
          label: '请选择'
        },
        {
          value: 1,
          label: '提交后，通知用户'
        },
        {
          value: 2,
          label: '提交后，通知管理员'
        },
        {
          value: 3,
          label: '审核通过后，通知用户'
        },
        {
          value: 4,
          label: '审核未通过，通知用户'
        },
        {
          value: 5,
          label: '开柜通知'
        }
      ],
      delMessageing: false, // 删除短信锁
      templateNumOfWords: '',
      messageCount: 0,
      // 可插入变量
      variable1: [],
      variable2: [],
      // ueditor配置参数
      ueditorConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/yxb/static/UEditor/',
        toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'customstyle', 'paragraph', 'fontfamily', 'fontsize',
          '|', 'directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
          '|', 'touppercase', 'tolowercase', '|', 'link', 'unlink', 'anchor',
          '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'emotion', 'music', 'map', 'background', '|', 'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
          'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
          'print', 'preview', 'searchreplace', 'help'
        ]]
      }
    }
  },
  beforeCreate: function() {
    _that = this
  },
  filters: {
    setTypeName(params) {
      var val = ''
      for (let i = 0; i < _that.options.length; i++) {
        if (_that.options[i].value === params) {
          val = _that.options[i].label
          break
        }
      }
      return val
    }
  },
  mounted() {
    this.resetObjForm()
    this.resetRange()
    this.resetTreeSetData()
    let that = this
    this.id = this.$route.query.id
    // 注册表单type===2
    this.type = parseInt(this.$route.query.type) || 1

    if (!this.id) {
      if (this.type.toString() === '2') {
        getRegisterList({
          acid: this.acid
        })
          .then(res => {
            that.formInline = Object.assign(that.formInline, res.data)
            that.formInline.fields = []
            res.data.fields.forEach((item, index) => {
              that.formInline.fields[index] = Object.assign(
                {},
                that.form,
                res.data.fields[index]
              )
            })
            that.tableData = that.formInline.fields
            // 预约表单
            let forwardForm = res.data.appointment
            this.$store.commit('ldyxb/gzt/saveForwardForm', forwardForm)
            debugger
            // 短信模板数据
            that.messageTemplateData = res.data.sms_set
            that.tableData.forEach((item, index) => {
              that.tableData[index].disabled_delete = true // 隐藏删除按钮，通过列表显示来关闭此字段
            })
            this.insertVariable() // 插入短信可选择动态内容
            that.resetRange()
            that.rowDrop()
          })
          .finally(() => {})
      } else {
        this.$store.commit('ldyxb/gzt/saveForwardForm', []) // 预约表单
        this.insertVariable() // 插入短信可选择动态内容
        this.rowDrop()
      }
    } else {
      // 编辑
      getDetail(this.id).then(response => {
        that.type = response.type
        that.formInline = response.data
        that.tableData = response.data.fields
        // 预约表单
        let forwardForm = response.data.appointment
        this.$store.commit('ldyxb/gzt/saveForwardForm', forwardForm)

        that.messageTemplateData = response.data.sms_set // 短信模板数据
        that.tableData.forEach((item, index) => {
          that.tableData[index].disabled_delete = true // 隐藏删除按钮，通过列表显示来关闭此字段
        })
        this.insertVariable() // 插入短信可选择动态内容
        that.resetRange()
        that.rowDrop()
      })
    }
  },
  computed: {
    ...mapState('ldyxb/gzh', ['activeAcid', 'forwardForm']),
    ...mapGetters(['ldyxb/gzh', 'getForwardForm'])
  },
  methods: {
    // ueditor
    readyUeditor(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
    },
    // ueditor添加自定义按钮
    addCustomDialog(editorId) {
      window.UE.registerUI(
        'test-dialog',
        function(editor, uiName) {
          // 参考http://ueditor.baidu.com/doc/#COMMAND.LIST
          var btn = new window.UE.ui.Button({
            name: 'dialog-button',
            title: '上传图片',
            cssRules: `background-image: url('image/theme/icons.png')!important;background-position: -380px 0px;`,
            onclick: function() {
              // 渲染dialog
              document.querySelector('.picUpload').click()
            }
          })

          return btn
        },
        100 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */,
        editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
      )
    },
    // 获取上传图片的url
    _getUploadFileList(files, source) {
      if (!files.length) {
        return
      }
      const response = files[0].response
      if (!response || response.code !== 200) {
        return
      }
      this.imgUrl = `http://${response.data[0].url}`

      let editor = document.querySelector('.edui-default').getAttribute('id')
      window.UE.getEditor(editor).execCommand('insertimage', {
        src: this.imgUrl
      })
    },
    // 打开图片上传对话框
    handleUploadDlg() {
      this.$refs.upload.visible = true
    },
    // 插入短信可选择动态内容
    insertVariable() {
      // 可插入动态内容1筛选
      this.tableData.forEach((item, index) => {
        if (item.type === 1 || item.type === 3 || item.type === 4) {
          let key
          for (key in item) {
            if (key === 'name') {
              this.variable1.push(item.name)
            }
          }
        }
      })
      // 可插入动态内容2筛选
      this.tableData.forEach((item, index) => {
        if (
          item.type === 1 ||
          item.type === 2 ||
          item.type === 3 ||
          item.type === 4 ||
          item.type === 5 ||
          item.type === 6
        ) {
          let key
          for (key in item) {
            if (key === 'name') {
              this.variable2.push(item.name)
            }
          }
        }
      })
      // 开柜有效变量#柜号##取件密码#
      let guihao = '柜号'
      let qujianmm = '取件密码'
      this.variable2.push(guihao)
      this.variable2.push(qujianmm)
    },
    toBoolen(val) {
      return val === 1
    },
    resetRange() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].number = this.number + 1
        this.number++
      }
    },
    resetTreeSetData() {
      this.treeSetData = {
        defaultExpandAll: true, // 是否默认展开
        editFlg: false, // 是否是编辑状态
        treeData: [], // 树形组件数据集
        // 编辑树形数组内容
        editList: [],
        // 删除树形数据数组内容
        deleteList: [],
        // 添加树形数据数组内容
        addList: [],
        // 是否添加flg
        addNodeFlg: false,
        // 默认的id
        defaultId: 1,
        // 新增的最外层节点名称
        newName: '',
        tree_key: 0
      }
    },
    resetObjForm() {
      this.form = {
        number: '',
        type: '',
        reg: '',
        name: '',
        typename: '',
        is_must: 0,
        default: '',
        placeholder: '',
        validate_rule: '',
        error_info: '',
        is_modify: 0,
        is_show: 1,
        is_search: 0,
        extra: '',
        remark: '',
        state: 1,
        is_show_front: 1
      }
    },
    getTypeName(type) {
      let arr = this.options.filter((item, index) => {
        return item.value === type
      })
      this.form.typename = arr.length > 0 ? arr[0].label : ''
    },
    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    isJSON(str) {
      if (typeof str === 'string') {
        try {
          let obj = JSON.parse(str)
          if (typeof obj === 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          console.log('error：' + str + '!!!' + e)
          return false
        }
      } else {
        return false
      }
    },
    updateFormOption() {
      if (!this.form.name) {
        this.$message.error('请填写字段名称')
        return false
      }
      if (!this.form.error_info) {
        this.$message.error('请填写验证失败提示')
        return false
      }
      if (
        this.form.type.toString() === '7' ||
        this.form.type.toString() === '8' ||
        this.form.type.toString() === '9' ||
        this.form.type.toString() === '13'
      ) {
        this.form.extra = ''

        this.form.extra = JSON.stringify(this.treeSetData.treeData)
      } else {
        this.form.extra = ''
      }

      this.tableData.push(this.form)

      this.insertVariable()
      this.rowDrop()
      this.dialogFormVisible = false
    },
    // 删除表单元素
    handleDel: function(index) {
      const _this = this
      this.$confirm('确定删除该行吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          _this.tableData.splice(index, '1')
        })
        .catch(() => {})
    },
    // 编辑表单元素
    handleUpdate: function(index) {
      this.updateIndex = ''
      this.resetObjForm()
      this.resetTreeSetData()
      this.form = { ...this.tableData[index] }
      this.getTypeName(this.form.type)
      console.log(this.form)
      this.form.extra = this.form.extra === '{}' ? '[]' : this.form.extra
      this.treeSetData.treeData = JSON.parse(this.form.extra || '[]')
      console.log(this.treeSetData.treeData)
      debugger
      this.updateIndex = index
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    saveFormOption: function() {
      if (!this.form.name) {
        this.$message.error('请填写字段名称')
        return false
      }
      if (!this.form.error_info) {
        this.$message.error('请填写验证失败提示')
        return false
      }
      if (
        this.form.type.toString() === '7' ||
        this.form.type.toString() === '8' ||
        this.form.type.toString() === '9' ||
        this.form.type.toString() === '13'
      ) {
        this.form.extra = '[]'

        this.form.extra = JSON.stringify(this.treeSetData.treeData)
      } else {
        this.form.extra = '[]'
      }

      console.log(this.form)
      this.$set(this.tableData, this.updateIndex, { ...this.form })
      this.dialogFormVisible = false
    },
    // 增加表单元素
    handleAddFormLine: function(type) {
      if (!type) {
        this.$message.error('请选择表单类型')
      } else {
        this.addFormItem(type)
      }
    },
    addFormItem(type) {
      this.resetObjForm()
      this.resetTreeSetData()
      this.form.type = type
      this.form.number = this.tableData.length + 1
      this.getTypeName(type)
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
    },
    eddFormItem(type) {
      this.resetObjForm()
      this.form.type = type
      this.form.number = this.tableData.length + 1
      this.getTypeName(type)
      this.dialogFormVisible = true
    },
    // 确定修改
    handleFormSubmit() {
      if (this.btnloading) {
        return false
      }
      if (!this.formInline.title) {
        this.$message.error('请填写标题')
        return false
      }
      if (this.tableData.length < 1) {
        this.$message.error('请添加表单数据')
        return false
      }

      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].sort = i + 1
        this.number++
      }
      this.formInline.fields = [...this.tableData]
      this.formInline.sms_set = this.messageTemplateData
      this.formInline.is_admin = 1 // 是否为管理员表单
      this.formInline.appointment = this.$store.getters['ldyxb/gzt/getForwardForm'] // 预约表单
      debugger
      let data = Object.assign({}, this.formInline, { acid: this.activeAcid })
      console.log(data)
      this.btnloading = true
      if (this.id) {
        Promise.all([editScene({ ...data })])
          .then(res => {
            let that = this
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 2000,
              onClose() {
                that.btnloading = false
                if (that.delMessageing === true) {
                  that.delMessageing = false
                  return
                }
                that.$router.push({ name: 'gzt-adminform-list' })
              }
            })
          })
          .catch(() => {
            this.btnloading = false
          })
      } else {
        Promise.all([addScene({ ...data })])
          .then(res => {
            let that = this

            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 2000,
              onClose() {
                that.btnloading = false
                if (that.delMessageing === true) {
                  that.delMessageing = false
                  return
                }
                that.$router.push({ name: 'gzt-adminform-list' })
              }
            })
          })
          .catch(() => {
            this.btnloading = false
          })
      }
    },
    back() {
      this.$router.push({
        name: 'gzt-adminform-list'
      })
    },
    // 添加短信模板
    HandleAddSmsTemplate() {
      this.dialogMsgTplVisible = true
      this.formMessage = {
        type: 0,
        title: '',
        signname: '',
        template: '',
        msisdn: ''
      }
    },
    // 短信模板提交
    HandleSmsTemplate() {
      if (this.btnloading) {
        return false
      }
      this.btnloading = true

      if (this.formMessage.type === 0) {
        this.$message({
          message: '请选择通知类型',
          type: 'error',
          duration: 2000
        })
        this.btnloading = false
        return
      }

      let data = this.formMessage

      if (!data.id) {
        let type = this.formMessage.type
        for (let i = 0; i < this.messageTemplateData.length; i++) {
          if (this.messageTemplateData[i].type === type) {
            this.$message({
              message: '通知类型重复',
              type: 'error',
              duration: 2000
            })
            this.btnloading = false
            return false
          }
        }
        data.acid = this.activeAcid
        Promise.all([addSmsTemplate(data)])
          .then(res => {
            let that = this
            let formMessage = res[0].data
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 2000,
              onClose() {
                that.btnloading = false
              }
            })
            this.messageTemplateData.push({ ...formMessage })

            this.dialogMsgTplVisible = false
          })
          .catch(res => {
            this.btnloading = false
          })
      } else {
        Promise.all([editSmsTemplate(data)])
          .then(res => {
            let that = this
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 2000,
              onClose() {
                that.btnloading = false
              }
            })
            // this.formMessage = res[0].data
            this.messageTemplateData[this.curMessageIndex].type = this.formMessage.type
            this.messageTemplateData[this.curMessageIndex].msisdn = this.formMessage.msisdn

            this.dialogMsgTplVisible = false
          })
          .catch(res => {
            this.btnloading = false
          })
      }
    },
    // 删除短信模板
    handleDelSmsTemplate(index) {
      if (this.btnloading) {
        return false
      }
      this.btnloading = true
      let that = this
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
        onClose() {
          that.btnloading = false
        }
      }).then(() => {
        let data = this.messageTemplateData[index]
        data.acid = this.activeAcid
        Promise.all([delSmsTemplate({ ...data })])
          .then(res => {
            let that = this
            this.messageTemplateData.splice(index, 1) // 删除数组里的数据
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 2000,
              onClose() {
                that.btnloading = false
                that.delMessageing = true
                that.handleFormSubmit() // 重新提交表单
              }
            })
          })
          .catch(res => {
            this.btnloading = false
          })
      })
    },
    // 获取短信模板详情
    handleGetSmsTemplateDetail(index) {
      if (this.btnloading) {
        return false
      }
      this.btnloading = true
      this.curMessageIndex = index // 当前选择的短信模板
      // 清空短信模板表单数据
      this.formMessage = {
        type: 0,
        title: '',
        signname: '',
        template: '',
        msisdn: ''
      }
      this.dialogMsgTplVisible = true
      let data = this.messageTemplateData[index]
      Promise.all([getSmsTemplateDetail({ ...data })])
        .then(res => {
          let that = this
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 2000,
            onClose() {
              that.btnloading = false
            }
          })
          this.formMessage = res[0].data

          this.$set(
            this.formMessage,
            'type',
            this.messageTemplateData[index].type
          ) // 增加短信类型字段
          this.$set(
            this.formMessage,
            'msisdn',
            this.messageTemplateData[index].msisdn
          ) // 增加发送对象字段
          this.messageCount = Math.floor(this.formMessage.template.length / 65)
        })
        .catch(res => {
          this.btnloading = false
        })
    },
    // 插入动态内容1
    insertVariable1(index) {
      let str = this.formMessage.msisdn
      if (this.selectionStart1 === undefined) {
        this.selectionStart1 = this.formMessage.msisdn.length
        this.selectionEnd1 = this.formMessage.msisdn.length
      }
      let selectionStart1 = this.selectionStart1
      let selectionEnd1 = this.selectionEnd1
      let result = `${str.substring(0, selectionStart1)}#${
        this.variable1[index]
      }#${str.substring(selectionEnd1)}`
      this.formMessage.msisdn = result
      this.selectionStart1 = this.formMessage.msisdn.length // 复位selectionStart1
      this.selectionEnd1 = this.formMessage.msisdn.length // 复位selectionEnd1
    },
    handleGetTabindex1(e) {
      console.log(e)
      this.selectionStart1 = e.target.selectionStart
      this.selectionEnd1 = e.target.selectionEnd
    },
    // 插入动态内容2
    insertVariable2(index) {
      let str = this.formMessage.template
      if (this.selectionStart2 === undefined) {
        this.selectionStart2 = this.formMessage.template.length
        this.selectionEnd2 = this.formMessage.template.length
      }
      let selectionStart2 = this.selectionStart2
      let selectionEnd2 = this.selectionEnd2
      let result = `${str.substring(0, selectionStart2)}#${
        this.variable2[index]
      }#${str.substring(selectionEnd2)}`
      this.formMessage.template = result
      this.selectionStart2 = this.formMessage.template.length // 复位selectionStart
      this.selectionEnd2 = this.formMessage.template.length // 复位selectionEnd
    },
    handleGetTabindex2(e) {
      console.log(e)
      this.selectionStart2 = e.target.selectionStart
      this.selectionEnd2 = e.target.selectionEnd
    },
    // 计算短信占用条数
    computeMessageCount() {
      this.templateNumOfWords = this.formMessage.template.length
      this.messageCount = Math.floor(this.formMessage.template.length / 65)
    }
  }
}
</script>

<style lang="scss">
.yxb-container-full__body {
  padding: 20px;
}
.padding {
  padding: 15px 0;
}
.move-tree {
  color: #c0c4cc;
  cursor: move;
}
.el-form--inline .el-form-item__label {
  text-align: left;
}
.mar-tb05 {
  margin: 5px auto;
}
.notice {
  border: 0;
  left: -40px;
  top: 10px;
  padding: 0;
  position: absolute;
}
.msgTpl-wrap {
  width: 300px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  display: flex;
  box-sizing: border-box;
  outline: 0;
  margin: 0 0 10px;
  transition: 0.1s;
  padding: 10px 10px;
  font-size: 14px;
  border-radius: 4px;
}
.msgTpl-wrap p {
  margin: 0;
  line-height: 1.5;
}

.msgTpl-wrap-m,
.msgTpl-wrap-r {
  margin: 0 15px;
  color: #666666;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.msgTpl-wrap-m {
  margin-left: 50px;
}
.msgTpl-wrap-r {
  margin-left: 0;
}
.msgTpl-wrap-subtit {
  color: #999999;
  font-size: 12px;
}
.m_container {
  display: flex;
  .box {
    flex: 1;
    position: relative;
    img {
      width: 300px;
      margin: 0 auto;
      display: block;
    }
  }
}
.m_appendTxt {
  margin-left: 100px;
  margin-top: -10px;
  margin-bottom: 10px;
  .var {
    background-color: rgba(230, 247, 255, 1);
    border: 1px solid rgba(145, 213, 255, 1);
    padding: 2px 5px;
    color: #1890ff;
    border-radius: 5px;
    font-size: 12px;
    margin-right: 6px;
    cursor: pointer;
    margin-bottom: 6px;
    display: inline-block;
  }
}
.m_duanxin {
  position: absolute;
  left: 90px;
  top: 60px;
  width: 250px;
  font-size: 14px;
  h3 {
    font-weight: normal;
  }
}
.m_txt {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: #777;
}

</style>
