<template>
  <div class="yxb-p">
    <el-form :inline="true" size="small">
      <el-form-item v-if="auth.add && currentOperateData.can_add == 1">
        <el-button :disabled="loading" @click="addlink">
          <yxb-icon name="plus" />
          增加短信模板
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 列表部分 -->
    <jcy-page-body
      :loading="loading"
      :get-auth="auth"
      :table-data="currentTableData"
      :header-data="currentHeaderData"
      :operate-data="currentOperateData"
      :add-data="addBodyData"
      @pageHandleSwitch="handleSwitch($event)"
      @pageDelete="handleDelete($event)"
      @pageUpdate="handleUpdate($event)"
    >
    </jcy-page-body>
    <!-- 弹窗 增加或者修改 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px"
    >
      <yxb-page-edit
        :get-auth="auth"
        :table-data="currentTableData"
        :header-data="currentHeaderData"
        :operate-data="currentOperateData"
        :dialogForm-visible="dialogFormVisible"
        :dialog-status="dialogStatus"
        :form="form"
        :dialogLoading="dialogLoading"
        ref="pageedit"
      >
      </yxb-page-edit>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small"
          >取消</el-button
        >

        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="create"
          size="small"
          >确定</el-button
        >

        <el-button
          v-else
          type="primary"
          :loading="dialogLoading"
          @click="update"
          size="small"
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import {  } from '@/api/gzt/message'

export default {
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
          can_delete: 1,
          can_edit: 1,
          can_add: 1
        }
      }
    }
  },
  data() {
    return {
      currentTableData: [],
      currentHeaderData: [],
      currentOperateData: {},
      addBodyData: [
        {
          label: '记录',
          name: '查看',
          url: 'gzt-message-history',
          type: -1,
          is_list: 1
        }
        // { label: '开启状态', name: 'state', active: 1, inactive: 0, type: -4, is_list: 1 }
      ],
      multipleSelection: [],
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
        update: '编辑',
        create: '新增'
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
      form: {
        acid: this.activeAcid
      },
      state: '', // 类型选择值
      type_name: '',
      restaurants: [], // 类型
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
    ...mapState('ldyxb/gzh', ['activeAcid'])
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
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
    // 跳转编辑对话框
    handleUpdate(index) {
      if (this.currentTableData[index].id) {
        // 新增编辑共用一个页面
        this.$router.push({
          name: 'gzt-message-addform',
          query: {
            id: this.currentTableData[index].id
          }
        })
        debugger
      }
    },
    addlink() {
      this.$router.push({
        name: 'gzt-message-addform'
      })
    },
    handleSelect(item) {
      this.form.type = item.id
      this.type_name = item.value
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
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
