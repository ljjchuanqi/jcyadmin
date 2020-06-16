<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      @selection-change="handleSelectionChange"
      stripe
    >
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <template v-for="(item, index) in renderData">
        <el-table-column
          :key="index"
          :prop="item.name"
          :label="item.label"
          align="center"
          min-width="60"
          v-if="item.is_list == 1 && item.type == 2"
        >
          <template slot-scope="scope">
            <span
              v-if="
                Object.prototype.toString.call(item.option) ===
                  '[object Object]'
              "
              :class="{
                txtgreen:
                  item.name === 'audit_state' && scope.row[item.name] === 2,
                txtorange:
                  item.name === 'audit_state' && scope.row[item.name] === 3
              }"
            >
              {{ item.option[scope.row[item.name]] }}
            </span>
            <span
              v-else-if="
                Object.prototype.toString.call(item.option) ===
                  '[object String]'
              "
            >
              {{ getItem(scope.row[item.name], item.option) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          :prop="item.name"
          :label="item.label"
          align="center"
          min-width="60"
          v-else-if="item.is_list == 1 && item.type == 9"
        >
          <template slot-scope="scope">
            <!-- {{ scope.row[item.name] }} -->
            <!-- item.selects是异步获取的数组对象比如：[{id:1,name:"a"},{id:12,name:"b"}] -->
            <!-- scope.row[item.name]是一个id值，找出对应的id值相等的对象，显示的name -->
            {{ gettypename(item.selects || [], scope.row[item.name]) }}
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          :prop="item.name"
          :label="item.label"
          align="center"
          min-width="120"
          v-else-if="item.is_list == 1 && item.type == 3"
        >
          <template slot-scope="scope">
            <!-- <el-image v-if="scope.row[item.name]"
                class="gzh-image"
                @click="handleView(scope.row[item.name])"
                :src="scope.row[item.name] | getPreviewUrl"
                fit="contain"
                lazy/> -->
            <div v-if="scope.row[item.name]">
              （列表只显示一张图片）<br />
              <a
                target="_blank"
                :href="scope.row[item.name].split(',')[0]"
                class="img-wrap"
              >
                <img :src="scope.row[item.name].split(',')[0]" />
              </a>
            </div>
            <span v-if="!scope.row[item.name]">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          :prop="item.name"
          :label="item.label"
          align="center"
          min-width="60"
          v-else-if="item.is_list == 1 && item.type == 7"
        >
          <template slot-scope="scope">
            <el-button
              v-if="getAuth.set && scope.row[item.name]"
              @click="opendetail(scope.row[item.name])"
              size="small"
              type="text"
              >点击查看</el-button
            >
            <span v-if="!scope.row[item.name]">暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          :prop="item.name"
          :label="item.label"
          align="center"
          min-width="120"
          v-else-if="item.is_list == 1 && item.type == 10"
        >
          <template slot-scope="scope">
            <div v-if="scope.row[item.name]">
              （列表只显示一个附件）<br />
              <a
                target="_blank"
                :href="scope.row[item.name].split(',')[0]"
                class="img-wrap"
              >
                点击下载
              </a>
            </div>
            <span v-if="!scope.row[item.name]">暂无</span>
          </template>
        </el-table-column>

        <el-table-column
          :key="index"
          :prop="item.name"
          :label="item.label"
          align="center"
          min-width="60"
          v-else-if="item.is_list == 1"
        >
        </el-table-column>
      </template>
      <template v-for="(item2, index2) in addData">
        <el-table-column
          :key="'item' + index2"
          :label="item2.label"
          align="center"
          min-width="60"
          v-if="item2.is_list == 1 && item2.type == -1"
        >
          <!-- 点击跳转 -->
          <template slot-scope="scope">
            <el-button
              @click="golink(scope.$index, item2.url)"
              size="small"
              type="text"
              >{{ item2.name }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          :key="'item' + index2"
          :label="item2.label"
          align="center"
          min-width="60"
          fixed="right"
          v-if="item2.is_list == 1 && item2.type == -2"
        >
          <!-- 点击弹窗处理 -->
          <template slot-scope="scope">
            <el-button @click="goDetail(scope.$index)" size="small" type="text">
              <span v-if="scope.row[item2.name] !== 1">{{ item2.label }}</span>
              <span v-else>{{ item2.label2 }}</span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          :key="'item' + index2"
          :label="item2.label"
          align="center"
          min-width="60"
          v-if="item2.is_list == 1 && item2.type == -3"
        >
          <template slot-scope="scope">
            <!-- 等于某个值才显示 -->
            <el-button
              v-if="scope.row[item2.filter] === item2.filterval"
              @click="goDetail(scope.$index)"
              size="small"
              type="text"
            >
              {{ item2.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          :key="'item' + index2"
          :label="item2.label"
          align="center"
          min-width="60"
          v-if="item2.is_list == 1 && item2.type == -4"
        >
          <!-- 开关操作 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row[item2.name]"
              :active-value="item2.active"
              :inactive-value="item2.inactive"
              disabled
              @click.native="handleSwitch(scope.$index)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="operateData.can_edit == 1 || operateData.can_delete == 1"
        fixed="right"
        label="操作"
        align="center"
        min-width="60"
      >
        <template slot-scope="scope">
          <el-button
            v-if="getAuth.set && operateData.can_edit == 1"
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text"
            >编辑</el-button
          >

          <el-button
            v-if="getAuth.del && operateData.can_delete == 1"
            @click="handleDelete(scope.$index)"
            size="small"
            type="text"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗显示 -->
    <el-dialog
      title="详情"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      close="clearoptinval"
    >
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
        return {}
      }
    }
  },
  watch: {
    headerData: {
      handler(data) {
        let that = this
        if (
          data.some(row => {
            return row.type === 9
          })
        ) {
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
  computed: {},
  methods: {
    jsondeepclone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    handleDelete(val) {
      this.$emit('pageDelete', val)
    },
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
    handleUpdate(val) {
      this.$emit('pageUpdate', val)
    },
    goDetail(val) {
      this.$emit('pageGoDetail', val)
    },
    handleSwitch(val) {
      this.$emit('pageHandleSwitch', val)
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
    },
    dfs(data = [], cb) {
      data.forEach(node => {
        cb(node)
        if (!node.children) return
        this.dfs(node.children, cb)
      })
    },
    getItem(item, option) {
      if (!option) {
        return ''
      } else {
        let arr = JSON.parse(option)
        let value = ''
        item = item || ''
        let itemArr = item.split(',')
        if (itemArr.length > 1) {
          var cache = item.split(',').reduce((cache, value) => {
            cache[value] = true
            return cache
          }, {})

          var result = []
          this.dfs(arr, node => {
            if (cache[node.id] === true) {
              result.push(node.name)
            }
          })
          value = result.join(' ')
        } else {
          for (let i = 0; i < arr.length; i++) {
            if (item === arr[i].id.toString()) {
              value = arr[i].name
              break
            }
          }
        }

        return value
      }
    }
  }
}
</script>
<style scoped>
.img-wrap {
  overflow: hidden;
  margin: 10px;
}
.img-wrap img {
  width: 60px;
}
>>> .el-switch.is-disabled .el-switch__core,
>>> .el-switch.is-disabled .el-switch__label {
  cursor: pointer !important;
}
.txtgreen {
  color: #52c41a;
}
.txtorange {
  color: #ff9900;
}
</style>
