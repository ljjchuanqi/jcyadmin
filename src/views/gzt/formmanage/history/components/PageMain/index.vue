<template>
  <div class="yxb-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.add && currentOperateData.can_add == 1">
        <el-button
          :disabled="loading"
          @click="handleCreate">
          <yxb-icon name="plus"/>
          新增
        </el-button>
      </el-form-item>
       <el-form-item>
        <el-button
          :disabled="loading"
          @click="handleExport">
          <yxb-icon name="plus"/>
          导出
        </el-button>
      </el-form-item>
       <el-form-item>
        <el-button
        type="primary"
          @click="handleAudit">
          <yxb-icon name="pencil"/>
          批量审核通过
        </el-button>
      </el-form-item>

    </el-form>
    <!-- 列表部分 -->
     <page-body
     :loading="loading"
     :get-auth="auth"
     :table-data="currentTableData"
     :header-data="currentHeaderData"
     :operate-data="currentOperateData"
     :add-data="addBodyData"
     @selectionChange="handleSelectionChange"
     @pageGoDetail="handleGoDetail($event)"
      @pageDelete="handleDelete($event)"
      @pageUpdate="handleUpdate($event)">
      </page-body>
    <!-- 弹窗 增加或者修改 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
    <yxb-page-edit
        :get-auth="auth"
        :table-data="currentTableData"
        :header-data="currentHeaderData"
        :operate-data="currentOperateData"
        :dialogForm-visible="dialogFormVisible"
        :dialog-status="dialogStatus"
        :form = 'form'
        :dialogLoading = 'dialogLoading'
        ref="pageedit">
    </yxb-page-edit>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          size="small">取消</el-button>

        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="create"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="update"
          size="small">修改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="dialogDetailVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="800px">
    <!-- 详情部分 -->
     <jcy-page-audit
        :get-auth="auth"
        :table-data="currentTableData"
        :header-data="currentHeaderData"
        :operate-data="currentOperateData"
        :dialogForm-visible="dialogDetailVisible"
        :form = 'formDetail'
        :dialogLoading = 'dialogLoading'
        ref="pageAudit"
      >
      </jcy-page-audit>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogDetailVisible = false"
          size="small">关闭</el-button>
          <el-button
          type="primary"
          :loading="dialogLoading"
          v-if="isshowsubmitAudit"
          @click="submitAudit"
          size="small">提交</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addScene, editScene } from '@/api/common/index'
import { delHistory, addExport, getHistoryDetail, formAudit, formSelectsAudit } from '@/api/gzt/formmanage'

export default {
  components: {
    'PageBody': () => import('./components/index')
  },
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    headerData: {
      default: () => []
    },
    operateData: {
      default: () => {
        return {
          'can_delete': 1,
          'can_edit': 1,
          'can_add': 1
        }
      }
    },
    mform_title: {
      default: ''
    }
  },
  data() {
    return {
      currentTableData: [],
      currentHeaderData: [],
      currentOperateData: {},
      multipleSelection: [],
      addBodyData: [{ label: '查看详情', label2: '审核', name: 'audit_state', type: -2, is_list: 1 }],
      auth: {
        add: true,
        set: true,
        del: true,
        sort: true,
        url: true,
        enable: true,
        disable: true
      },
      targetMap: {
        _self: {
          text: '当前窗口',
          value: '_self'
        },
        _blank: {
          text: '新窗口',
          value: '_blank'
        }
      },
      textMap: {
        update: '编辑场次',
        create: '新增场次'
      },
      statusMap: {
        0: {
          text: '禁用',
          type: 'danger'
        },
        1: {
          text: '启用',
          type: 'success'
        },
        2: {
          text: '...',
          type: 'info'
        }
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogDetailVisible: false,
      form: {
        acid: this.activeAcid
      },
      formDetail: {},
      state: '', // 类型选择值
      type_name: '',
      restaurants: [], // 类型
      isshowsubmitAudit: true,
      selectDate: [] // 选择时间数组
    }
  },

  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    },
    headerData: {
      handler(val) {
        this.currentHeaderData = val
      },
      immediate: true
    },
    operateData: {
      handler(val) {
        this.currentOperateData = val
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('ldyxb/gzh', [
      'activeAcid'
    ])
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      // this.auth.add = this.$has('/goods/setting/brand/add')
      // this.auth.set = this.$has('/goods/setting/brand/set')
      // this.auth.del = this.$has('/goods/setting/brand/del')
      // this.auth.sort = this.$has('/goods/setting/brand/sort')
      // this.auth.url = this.$has('/goods/setting/brand/url')
      // this.auth.enable = this.$has('/goods/setting/brand/enable')
      // this.auth.disable = this.$has('/goods/setting/brand/disable')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.id)
        })
      } else {
        idList.push(this.currentTableData[val].id)
      }

      return idList
    },
    // 获取上传文件
    _getUploadFileList(files, source) {
      if (!files.length) {
        return
      }
      const response = files[0].response
      if (!response || response.code !== 200) {
        return
      }
      this.form[source] = ''
      this.form[source] += response.data[0].url
    },
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取排序字段
    sortChange({ column, prop, order }) {
      let sort = {
        order_type: undefined,
        order_field: undefined
      }

      if (column && order) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        acid: this.activeAcid
      }
      this.$nextTick(() => {
        this.$refs.pageedit.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 导出
    handleExport() {
      let that = this
      this.$confirm('确定要导出数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          Promise.all([
            addExport({ acid: that.activeAcid, mform_id: that.$route.query.id, mform_title: this.mform_title })
          ])
            .then(res => {
              that.dialogFormVisible = false
              that.$message.success('操作成功,请在导出列表中查看进度')
            })
            .catch(() => {
              that.dialogLoading = false
            })
        })
        .catch(() => {
        })
    },
    // 请求创建
    create() {
      this.$refs.pageedit.startValidate(valid => {
        if (valid) {
          this.dialogLoading = true

          Promise.all([
            addScene({ ...this.form })
          ])
            .then(res => {
              if (res[0] && res[0].code === -1) {
                this.$message.error('暂无权限')
                this.dialogLoading = false
                return false
              }
              this.currentTableData.unshift({
                ...res[0].data
              })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 弹出编辑对话框
    handleUpdate(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }
      this.form.acid = this.activeAcid
      this.$nextTick(() => {
        this.$refs.pageedit.clearValidate()
      })

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑
    update() {
      this.$refs.pageedit.startValidate(valid => {
        if (valid) {
          this.dialogLoading = true

          Promise.all([
            editScene({ ...this.form })
          ])
            .then(res => {
              if (res[0] && res[0].code === -1) {
                this.$message.error('暂无权限')
                this.dialogLoading = false
                return false
              }
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res[0].data
                })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    handleGoDetail(index) {
      console.log(this.currentTableData[index].id)
      this.formDetail = {}
      getHistoryDetail(this.currentTableData[index].id).then((res) => {
        this.formDetail = res.data
        this.dialogLoading = false
        this.dialogDetailVisible = true
        if (this.formDetail.audit_state === 2) {
          this.isshowsubmitAudit = false
        } else {
          this.isshowsubmitAudit = true
        }
      }).catch(() => {})
    },
    // 批量删除
    handleDelete(val) {
      let id = this._getIdList(val)
      if (id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delHistory(id)
            .then((res) => {
              if (res[0] && res[0].code === -1) {
                this.$message.error('暂无权限')
                return false
              }
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (id.indexOf(this.currentTableData[i].id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              if (this.currentTableData.length <= 0) {
                this.$emit('refresh', true)
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },

    handleSelect(item) {
      this.form.type = item.id
      this.type_name = item.value
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    getObjval(val) {
      if (Object.prototype.toString.call(val) === '[object Object]') {
        return true
      } else {
        return false
      }
    },
    handlerFormAudit(fields_value) {
      if (this.dialogLoading) {
        return false
      }
      this.dialogLoading = true
      Promise.all([
        formAudit({ id: this.formDetail.id, acid: this.formDetail.acid, audit_state: this.formDetail.audit_state, fields_value: fields_value })
      ]).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$emit('refresh', true)
        this.dialogLoading = false
        this.dialogDetailVisible = false
      }).catch(() => {
        this.dialogLoading = false
      })
    },
    submitAudit() {
      let fields_value = []
      this.formDetail.audit_state = 2
      let ispass = true
      for (let obj in this.formDetail) {
        if (this.getObjval(this.formDetail[obj]) && this.formDetail[obj].field_info && this.formDetail[obj].field_info.is_show_front === 1 && this.formDetail[obj].id) {
          if (this.formDetail[obj].audit_state === 1) {
            this.$message.error('请对每一项进行审核')
            ispass = false
            break
          } else if (this.formDetail[obj].audit_state === 3) {
            if (!this.formDetail[obj].unaudit_tips.trim()) {
              ispass = false
              this.$message.error('请填写每一项不通过原因')
              break
            } else {
              this.formDetail.audit_state = 3
            }
          }
          fields_value.push(this.formDetail[obj])
        }
      }
      console.log(this.formDetail)
      console.log(fields_value)
      if (!ispass) {
        this.formDetail.audit_state = 1
        return false
      }
      this.handlerFormAudit(fields_value)
    },
    handleAudit() {
      let id = this._getIdList(null)
      if (id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          formSelectsAudit({ id: id, acid: this.activeAcid })
            .then((res) => {
              this.$emit('refresh', true)
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  .gzh-image {
    width: 80px;
    height: 80px;
    &:hover {
      cursor: pointer;
    }
  }
</style>
