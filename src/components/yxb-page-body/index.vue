<template>
<div>
<el-table
      v-loading="loading"
      :data="tableData"
      stripe>
      <template v-for="(item,index) in renderData" >

        <el-table-column
        :key="index"
        :prop="item.name"
        :label="item.label"
        align="center"
        min-width="60"
        v-if="item.is_list==1 && item.type == 2">
        <template slot-scope="scope">
            {{item.option[scope.row[item.name]]}}
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          :prop="item.name"
          :label="item.label"
          align="center"
          min-width="60"
          v-else-if="item.is_list==1 && item.type == 9">
          <template slot-scope="scope">
            <!-- {{ scope.row[item.name] }} -->
             <!-- item.selects是异步获取的数组对象比如：[{id:1,name:"a"},{id:12,name:"b"}] -->
             <!-- scope.row[item.name]是一个id值，找出对应的id值相等的对象，显示的name -->
              {{gettypename(item.selects || [],scope.row[item.name])}}
          </template>
        </el-table-column>
         <el-table-column
        :key="index"
        :prop="item.name"
        :label="item.label"
        align="center"
        min-width="60"
        v-else-if="item.is_list==1 && item.type == 3">
         <template slot-scope="scope">
          <el-image v-if="scope.row[item.name]"
                class="gzh-image"
                @click="handleView(scope.row[item.name])"
                :src="scope.row[item.name] | getPreviewUrl"
                fit="contain"
                lazy/>
          <span v-if="!scope.row[item.name]">暂无</span>
        </template>
        </el-table-column>
        <el-table-column
        :key="index"
        :prop="item.name"
        :label="item.label"
        align="center"
        min-width="60"
        v-else-if="item.is_list==1 && item.type == 7">
         <template slot-scope="scope">
           <el-button
            v-if="getAuth.set && operateData.can_edit==1"
            @click="opendetail(scope.row[item.name])"
            size="small"
            type="text">点击查看</el-button>
          <span v-if="!scope.row[item.name]">暂无</span>
        </template>
        </el-table-column>

        <el-table-column
        :key="index"
        :prop="item.name"
        :label="item.label"
        align="center"
        min-width="60"
        v-else-if="item.is_list==1">
        </el-table-column>

      </template>
       <template v-for="(item2,index2) in addData" >
          <el-table-column
              :key="'item'+index2"
              :label="item2.label"
              align="center"
              min-width="60"
              v-if="item2.is_list==1 && item2.type == -1">
               <template slot-scope="scope">
                  <el-button
                        @click="golink(scope.$index,item2.url)"
                        size="small"
                        type="text">{{item2.name}}</el-button>
                    </template>
          </el-table-column>
       </template>
      <el-table-column
        label="操作"
        align="center"
        min-width="60">
        <template slot-scope="scope">

          <el-button
            v-if="getAuth.set && operateData.can_edit==1"
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-if="getAuth.del && operateData.can_delete==1"
            @click="handleDelete(scope.$index)"
            size="small"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗显示 -->
    <el-dialog title="详情" :close-on-click-modal="false"  :visible.sync="dialogFormVisible" close="clearoptinval">
        <span v-html="dialogContent"></span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialogFormVisible">关 闭</el-button>
        </div>
  </el-dialog>
  </div>
</template>

<script>
import util from '@/utils/util'
import { requestUrl } from '@/api/index/index'
export default {
  props: {
    loading: {
      default: false
    },
    getAuth: {
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
    },
    addData: {
      type: Array,
      default: () => []
    },
    operateData: {
      default: () => {
        return {
        }
      }
    }
  },
  watch: {
    headerData: {
      handler(data) {
        // let that = this
        // that.renderData = data
        // (when headerData change => data) {  data.forEach(row => {
        //     ...
        //     request().then(res => {
        //       this.renderData = this.headerData.map(row => {
        //         return {
        //           ...row,
        //           select: res.data.data
        //         }
        //       })
        //     })
        //   }) }
        // this.renderData = data
        // data.forEach(row => {
        //   if (row.type === 9) {
        //     requestUrl(row.option).then(res => {
        //       this.renderData = this.headerData.map(row => {
        //         return {
        //           ...row,
        //           selects: res.data
        //         }
        //       })
        //     })
        //   }
        // })
        let that = this
        if (data.some(row => {
          return row.type === 9
        })) {
          data.forEach(function(val, index) {
            if (val.type === 9) {
              requestUrl(val.option).then(response => {
                val.selects = response.data
                val.count = index
                that.renderData = data
              })
            }
          })
        } else {
          that.renderData = data
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      show_search: false,
      renderData: [],
      rm: {},
      dialogFormVisible: false,
      dialogContent: ''
    }
  },
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'gzh_img') : ''
    }
  },
  computed: {
    headerData2: {
      get: function() {
        // console.log(this.headerData, '有值')
        let r = this.headerData((v, i) => {
          return v
        })
        return r
      }
    }
  },
  methods: {
    jsondeepclone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    handleDelete(val) {
      this.$emit('pageDelete', val)
    },
    handleUpdate(val) {
      this.$emit('pageUpdate', val)
    },
    // 打开链接地址
    handleView(url) {
      if (url) {
        this.$open(url)
        return
      }

      this.$message.warning('无效的链接地址')
    },
    golink(index, url) {
      this.$router.push({
        name: url,
        query: {
          id: this.tableData[index].id
        }
      })
    },
    gettypename(obj, val) {
      // console.log(this.renderData, 'ceshi')
      obj = obj || []
      for (let i = 0; i < obj.length; i++) {
        if (parseInt(obj[i].id) === parseInt(val)) {
          return obj[i].name
        }
      }
    },
    opendetail(content) {
      console.log(content)
      this.dialogContent = content
      this.dialogFormVisible = true
    },
    closeDialogFormVisible() {
      this.dialogFormVisible = false
      this.dialogContent = ''
    }

  }
}
</script>
