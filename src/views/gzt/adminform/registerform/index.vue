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
           <el-input type="textarea" v-model.trim="formInline.desc" style="width: 250px;"></el-input>
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
            <el-form-item label="是否发布" >
              <el-switch v-model="formInline.state"
                :active-value="1"
                  :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-row>
        <!--  -->

        <el-row :gutter="10">
         <el-form-item label="表单内容:" style="margin: 0;"></el-form-item>
          <div class="padding">
              <el-table :data="tableData"
                  border
                  row-key="number"
                >
                <el-table-column v-for="(item, index) in col"
                    :key="`col_${index}`"
                    :label="item.label"
                    align="center">
                    <template slot-scope="scope">
                      <div
                        v-if="col[index].prop !=='id'
                        && col[index].prop !=='operate'
                        && col[index].prop !=='type'
                        && col[index].prop !=='is_must'
                        && col[index].prop !=='is_show'" >
                      {{scope.row[col[index].prop]}}</div>
                      <div v-if="col[index].prop ==='id'">
                        <i class="fa fa-align-justify move-tree"></i>
                      </div>
                      <div v-if="col[index].prop === 'type'">
                        <span>{{ scope.row[col[index].prop]|setTypeName}}</span>
                      </div>
                      <div v-if="col[index].prop === 'is_must'">
                        <span v-if="scope.row[col[index].prop] ===1">必填</span>
                        <span v-else>选填</span>
                      </div>
                      <div v-if="col[index].prop === 'is_show'">
                        <el-switch v-model="scope.row[col[index].prop]"
                            :active-value="1"
                            :inactive-value="0">
                          </el-switch>
                      </div>
                      <div v-if="col[index].prop ==='operate'">
                        <el-button
                            @click="handleUpdate(scope.$index)"
                            size="small"
                            type="text">编辑</el-button>
                        <el-button
                          @click="handleDel(scope.$index)"
                          size="small"
                          type="text"
                          style="color:#F56C6C">
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
             <el-button class="mar-tb05" plain  v-for="item in options" :key="item.value" @click="handleAddFormLine(item.value)">{{item.label}}</el-button>
           </el-form-item>
        </el-row>
         <br>
         <el-row :gutter="10">
          <el-form-item label="截止时间" prop="stop_time" style="width: 350px;">
              <el-date-picker
                v-model.trim="formInline.stop_time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row :gutter="10">
            <el-form-item label="审核条件" >
              <el-checkbox v-model="formInline.need_audit" :true-label='1' :false-label='0'>需人工审核</el-checkbox>
               <el-input
                  v-if="formInline.need_audit===1"
                  v-model.trim="formInline.unaudit_tips"
                  placeholder="填写审核未通过提示。如：审核未通过，请根据错误提示重新填写。"
                  style="width: 450px;margin-right:10px"
                ></el-input>
                <el-checkbox v-if="formInline.need_audit===1" v-model="formInline.is_sms" :true-label='1' :false-label='0'>开启短信提醒</el-checkbox>
            </el-form-item>

          </el-row>
          <el-row :gutter="10">
            <el-form-item label="短信模板" prop="msgtemplate" v-if="formInline.need_audit===1 && formInline.is_sms===1">
              <el-input type="textarea" v-model.trim="formInline.msgtemplate" style="width: 250px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="10">
            <el-form-item label="提交次数" prop="msgtemplate" v-if="formInline.need_audit!==1">
              <template>
                <el-radio v-model="formInline.is_repeat_post" :label="1">允许多次填写提交</el-radio>
                <el-radio v-model="formInline.is_repeat_post" :label="0">不允许多次提交</el-radio>
              </template>
            </el-form-item>
             <el-form-item label="提交次数" prop="msgtemplate" v-else>
              <template>
                <el-radio v-model="formInline.is_repeat_post" :label="1">审核未通过时重新填写</el-radio>
                <el-radio v-model="formInline.is_repeat_post" :label="0">审核未通过时修改</el-radio>
              </template>
            </el-form-item>
          </el-row>
          <el-row :gutter="10">
          <el-form-item>
            <el-button type="primary" :loading="btnloading" @click="handleFormSubmit">提交</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
          </el-row>
        </el-form>

    </div>
    <!-- 编辑option -->
    <el-dialog title="表单内容" :close-on-click-modal="false" :visible.sync="dialogFormVisible" close="clearoptinval">
      <!-- <el-form>
        <el-form-item label="option">
          <el-input type="textarea" v-model.trim="dialogvalue" placeholder="请填写，注意：type为2时填写json字符串，type为9时填写请求后缀字符串"></el-input>
        </el-form-item>
      </el-form> -->
      <form-detail
        :form = 'form'
        :treeSetData = 'treeSetData'
        ref="pageedit">
      </form-detail>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogStatus==='add'" @click="updateFormOption">确 定</el-button>
        <el-button type="primary" v-if="dialogStatus==='update'" @click="saveFormOption">保 存</el-button>
      </div>
</el-dialog>
  </yxb-container>
</template>

<script>
import { mapState } from 'vuex'
// import util from '@/utils/util'
import Sortable from 'sortablejs'
import formDetail from '../components/formdetail'
// import { requestUrl } from '@/api/index/index'
import { addScene, editScene, getDetail } from '@/api/gzt/adminform'
var _that
export default {
  components: {
    formDetail
  },
  data() {
    return {
      id: '',
      dialogFormVisible: false,
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
        state: 1
      },
      selects: [],
      optionsMetaShow: [],
      options: [
        { value: 1, label: '单行文本' },
        { value: 2, label: '多行文本' },
        { value: 3, label: '数字文本' },
        { value: 4, label: '手机号码' },
        { value: 5, label: '验证码' },
        { value: 6, label: '日期' },
        { value: 7, label: '单选' },
        { value: 8, label: '多选' },
        { value: 9, label: '下拉' },
        { value: 10, label: '图片上传' },
        { value: 11, label: '图片(二维码上传)' },
        { value: 12, label: '附件上传' },
        { value: 13, label: '级联选择器' },
        { value: 14, label: '编辑器' }
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
      treeSetData: {}
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
    this.resetRange()
    this.resetTreeSetData()
    let that = this
    this.id = this.$route.query.id
    if (!this.id) {
      // 增加
      this.rowDrop()
      this.resetObjForm()
    } else {
      // 编辑getRegisterList
      getDetail(this.id).then(response => {
        that.formInline = response.data
        that.tableData = response.data.fields
        that.resetRange()
        that.rowDrop()
      })
    }
  },
  computed: {
    ...mapState('ldyxb/gzh', [
      'activeAcid'
    ])
  },
  methods: {
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
        is_show: 1,
        is_search: 0,
        extra: '',
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
      if (this.form.type.toString() === '7' || this.form.type.toString() === '8' || this.form.type.toString() === '9' || this.form.type.toString() === '13') {
        this.form.extra = ''

        this.form.extra = JSON.stringify(this.treeSetData.treeData)
      } else {
        this.form.extra = ''
      }

      this.tableData.push(this.form)

      this.rowDrop()
      this.dialogFormVisible = false
      // let item = this.formInline.column_list[this.dialogindex]
      // if (!this.dialogvalue) {
      //   item.option = this.dialogvalue
      //   this.dialogFormVisible = false
      // } else {
      //   if (parseInt(item.type) === 2) {
      //     if (this.isJSON(this.dialogvalue)) {
      //       item.option = JSON.parse(this.dialogvalue)
      //       this.dialogFormVisible = false
      //     } else {
      //       this.$message.error('type=2时应该填写json字符串，例如：{"id":"1"}')
      //     }
      //   } else {
      //     item.option = this.dialogvalue
      //     this.dialogFormVisible = false
      //   }
      // }
    },
    // 删除表单元素
    handleDel: function(index) {
      const _this = this
      this.$confirm('确定删除该行吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        _this.tableData.splice(index, '1')
      })
        .catch(() => {
        })
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
      if (this.form.type.toString() === '7' || this.form.type.toString() === '8' || this.form.type.toString() === '9' || this.form.type.toString() === '13') {
        this.form.extra = '[]'

        this.form.extra = JSON.stringify(this.treeSetData.treeData)
      } else {
        this.form.extra = '[]'
      }

      console.log(this.form)
      this.$set(
        this.tableData,
        this.updateIndex,
        { ...this.form })
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
      console.log(this.formInline.is_repeat_post)
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
      console.log(this.tableData)
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].sort = i + 1
        this.number++
      }
      this.formInline.fields = [...this.tableData]
      let data = Object.assign({}, this.formInline, { acid: this.activeAcid })
      this.btnloading = true
      if (this.id) {
        Promise.all([
          editScene({ ...data })
        ])
          .then(res => {
            let that = this
            this.$message(
              {
                message: '操作成功',
                type: 'success',
                duration: 2000,
                onClose() {
                  that.btnloading = false
                  that.$router.push({ name: 'gzt-adminform-list' })
                }
              })
          })
          .catch(() => {
            this.btnloading = false
          })
      } else {
        Promise.all([
          addScene({ ...data })
        ])
          .then(res => {
            let that = this
            this.$message(
              {
                message: '操作成功',
                type: 'success',
                duration: 2000,
                onClose() {
                  that.btnloading = false
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
    }

  }
}
</script>

<style>
.yxb-container-full__body {
  padding: 20px;
}
.padding{
  padding: 15px 0
}
.move-tree{
  color: #C0C4CC;
  cursor: move;
}
.el-form--inline .el-form-item__label{
  text-align: left;
}
.mar-tb05{margin:5px auto}
</style>
