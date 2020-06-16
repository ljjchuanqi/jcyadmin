<template>
  <yxb-container :is-back-to-top="true">
    <div class="yxb-container-full__header">
      <el-form
        :rules="rules"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item prop="name" label="名称">
          <el-input
            v-model.trim="formInline.name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据库表名" prop="table_name">
          <el-input
            v-model.trim="formInline.table_name"
            :disabled="true"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="增加按钮" >
         <el-select v-model="formInline.can_add" style="width: 80px;">
              <el-option label="显示" :value="1"></el-option>
              <el-option label="隐藏" :value="0"></el-option>
        </el-select>
         </el-form-item>
        <el-form-item label="编辑按钮" >
         <el-select v-model="formInline.can_edit" style="width: 80px;">
              <el-option label="显示" :value="1"></el-option>
              <el-option label="隐藏" :value="0"></el-option>
        </el-select>
         </el-form-item>
        <el-form-item label="删除按钮" >
         <el-select v-model="formInline.can_delete" style="width: 80px;">
              <el-option label="显示" :value="1"></el-option>
              <el-option label="隐藏" :value="0"></el-option>
        </el-select>
         </el-form-item>
          <el-form-item>
          <el-button type="primary" :loading="btnloading" @click="handleFormSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      <div class="padding">
        <el-table :data="formInline.column_list" stripe border style="width: 100%">
          <el-table-column
            prop="label"
            label="label"
            align="center"
            min-width="120"
          >
           <template slot-scope="scope">
             <el-input v-model="scope.row.label"></el-input>
          </template>
          </el-table-column>
           <el-table-column
            prop="name"
            label="name"
            align="center"
            min-width="60"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="type"
            align="center"
            min-width="60"
          >
          <template slot-scope="scope">
             <el-input type="number" v-model="scope.row.type"></el-input>
          </template>
          </el-table-column>
          <el-table-column
            prop="option"
            label="option"
            align="center"
            min-width="120"
          >
           <template slot-scope="scope">
             <span @click="editoption(scope.row,scope.$index)">
               点击编辑

             </span>
          </template>
          </el-table-column>
          <el-table-column
            prop="is_search"
            label="is_search"
            align="center"
            min-width="60"
          >
          <template slot-scope="scope">
            <el-select v-model="scope.row.is_search">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
          </el-table-column>
           <el-table-column
            prop="search_type"
            label="search_type"
            align="center"
            min-width="60"
          >
          <template slot-scope="scope">
             <el-input v-model="scope.row.search_type"></el-input>
          </template>
          </el-table-column>
          <el-table-column
            prop="is_list"
            label="is_list"
            align="center"
            min-width="60"
          >
           <template slot-scope="scope">
            <el-select v-model="scope.row.is_list">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
          </el-table-column>
          <el-table-column
            prop="is_add"
            label="is_add"
            align="center"
            min-width="60"
          >
           <template slot-scope="scope">
            <el-select v-model="scope.row.is_add">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
          </el-table-column>
          <el-table-column
            prop="is_edit"
            label="is_edit"
            align="center"
            min-width="60"
          >
          <template slot-scope="scope">
            <el-select v-model="scope.row.is_edit">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
          </el-table-column>
           <el-table-column
            prop="sort"
            label="sort"
            align="center"
            min-width="60"
          >
           <template slot-scope="scope">
             <el-input v-model="scope.row.sort"></el-input>
          </template>
          </el-table-column>
          <el-table-column
            prop="is_must"
            label="is_must"
            align="center"
            min-width="60"
          >
          <template slot-scope="scope">
            <el-select v-model="scope.row.is_must">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 编辑option -->
    <el-dialog title="编辑option" :close-on-click-modal="false"  :visible.sync="dialogFormVisible" close="clearoptinval">
      <el-form>
        <el-form-item label="option">
          <el-input type="textarea" v-model.trim="dialogvalue" placeholder="请填写，注意：type为2时填写json字符串，type为9时填写请求后缀字符串"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateOption">确 定</el-button>
      </div>
</el-dialog>
  </yxb-container>
</template>

<script>
// import util from '@/utils/util'
import { getTableDetail, editScene } from '@/api/tablemanage/table'

export default {
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      dialogvalue: '',
      dialogindex: '',
      btnloading: false,
      formInline: {
        name: '',
        table_name: '',
        can_add: 1,
        can_edit: 1,
        can_delete: 1,
        column_list: []
      },
      selects: [],
      optionsMetaShow: [],
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        table_name: [
          { required: true, message: '请选择数据库表名', trigger: 'change' }
        ]
      }
    }
  },
  filters: {

  },
  mounted() {
    if (!this.$route.query.id) {
      this.$router.push({
        name: 'system-tablemanage-addtable'
      })
    } else {
      getTableDetail(this.$route.query.id).then(response => {
        this.formInline = response.data
      })
    }
  },
  methods: {
    // 设置配置数据
    setFormData(val) {
      this.form = val
      this.platforms = []

      // eslint-disable-next-line no-unused-vars
      for (const key in this.form.platform.value) {
        if (this.form.platform.value.hasOwnProperty(key)) {
          this.platforms.push({
            key: key,
            value: this.form.platform.value[key]
          })
        }
      }

      if (!this.form.allow_origin.value.length) {
        this.form.allow_origin.value = ['']
      }

      if (!this.platforms.length) {
        this.platforms = [{ key: null, value: '' }]
      }
    },
    clearoptinval() {
      this.dialogindex = ''
      this.dialogvalue = ''
    },
    editoption(row, index) {
      this.dialogindex = index
      if (!row.option) {
        this.dialogvalue = ''
      } else {
        if (typeof (row.option) === 'object') {
          this.dialogvalue = JSON.stringify(row.option)
        } else {
          this.dialogvalue = row.option
        }
      }

      this.dialogFormVisible = true
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
    updateOption() {
      let item = this.formInline.column_list[this.dialogindex]
      if (!this.dialogvalue) {
        item.option = this.dialogvalue
        this.dialogFormVisible = false
      } else {
        if (parseInt(item.type) === 2) {
          if (this.isJSON(this.dialogvalue)) {
            item.option = JSON.parse(this.dialogvalue)
            this.dialogFormVisible = false
          } else {
            this.$message.error('type=2时应该填写json字符串，例如：{"id":"1"}')
          }
        } else {
          item.option = this.dialogvalue
          this.dialogFormVisible = false
        }
      }
    },
    // 确定修改
    handleFormSubmit() {
      if (this.btnloading) {
        return false
      }
      if (!this.formInline.name) {
        this.$message.error('请填写名称')
        return false
      }
      if (!this.formInline.table_name) {
        this.$message.error('请选择数据库表')
        return false
      }
      this.btnloading = true

      Promise.all([
        editScene({ ...this.formInline })
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
                // that.$router.push({ name: 'system-tablemanage-table' })
              }
            })
        })
        .catch(() => {
          this.btnloading = false
        })
    }

  }
}
</script>

<style>
.padding{
  padding: 15px 0
}
</style>
