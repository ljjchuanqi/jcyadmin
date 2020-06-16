<template>
  <div class="yxb-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-if="auth.add">
        <el-button
          :disabled="loading"
          @click="handleCreate">
          <yxb-icon name="plus"/>
          手工添加公众号
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="handleCreate">
          <yxb-icon name="plus"/>
          授权添加公众号
        </el-button>
      </el-form-item>
      <yxb-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </yxb-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      @sort-change="sortChange"
      stripe>
      <el-table-column
        label="原始id"
        prop="original"
        align="center"
        min-width="60">
        <template slot-scope="scope">
          {{scope.row.original}}
        </template>
      </el-table-column>
      <el-table-column
        label="账号"
        prop="account"
        align="center"
        min-width="60">
        <template slot-scope="scope">
          {{scope.row.account}}
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name"
        align="center"
        min-width="60">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column
        label="简介"
        prop="intro"
        align="center"
        min-width="60">
      </el-table-column>
      <el-table-column
        label="图标"
        prop="headimg"
        align="center"
        min-width="90">
          <template slot-scope="scope">
          <el-image v-if="scope.row.headimg"
                class="gzh-image"
                @click="handleView(scope.row.headimg)"
                :src="scope.row.headimg | getPreviewUrl"
                fit="contain"
                lazy/>
          <span v-if="!scope.row.headimg">暂无</span>
        </template>
      </el-table-column>

      <el-table-column
        label="二维码"
        prop="qrcode"
        align="center"
        min-width="90">
          <template slot-scope="scope">
           <el-image v-if="scope.row.qrcode"
                class="gzh-image"
                @click="handleView(scope.row.qrcode)"
                :src="scope.row.qrcode | getPreviewUrl"
                fit="contain"
                lazy/>
          <span v-if="!scope.row.qrcode">暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        prop="level"
        align="center"
        min-width="60">
        <template slot-scope="scope">
          <span v-if="scope.row.level==1">订阅号</span>
          <span v-else-if="scope.row.level==2">服务号</span>
          <span v-else-if="scope.row.level==3">认证订阅号</span>
          <span v-else-if="scope.row.level==4">认证服务号/认证媒体/政府订阅号</span>
          <span v-else>——</span>
        </template>
      </el-table-column>
      <el-table-column
        label="接入类型"
        prop="type"
        align="center"
        min-width="60">
        <template slot-scope="scope">
           <span v-if="scope.row.type==1">授权接入</span>
          <span v-else-if="scope.row.type==2">直接接入</span>
          <span v-else>——</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="140">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.url && auth.url"
            @click="handleView(scope.$index)"
            size="small"
            type="text">
            <el-tooltip placement="top">
              <div slot="content">
                打开方式：{{targetMap[scope.row.target].text}}<br/>
                链接地址：{{scope.row.url}}
              </div>
              <yxb-icon name="link"/>
            </el-tooltip>
            链接
          </el-button>

          <el-button
            v-if="auth.set"
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-if="auth.del"
            @click="handleDelete(scope.$index)"
            size="small"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
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
        :rules="rules"
        label-width="96px"
        ref="form">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              label="公众号名称"
              prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入公众号名称"
                :clearable="true"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="账号名"
              prop="account">
              <el-input
                v-model="form.account"
                placeholder="请输入账号名"
                :clearable="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="类型" prop="level">
        <el-select v-model="form.level" placeholder="请选择类型">
          <el-option label="订阅号" :value="1"></el-option>
          <el-option label="服务号" :value="2"></el-option>
          <el-option label="认证订阅号" :value="3"></el-option>
          <el-option label="认证服务号/认证媒体/政府订阅号" :value="4"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item
          label="简介"
          prop="intro">
          <el-input
            v-model="form.intro"
            placeholder="请输入此公众号的功能及用途"
            :clearable="true"/>
        </el-form-item>
        <el-form-item
              label="原始ID"
              prop="original">
              <el-input
                v-model="form.original"
                placeholder="原始ID不能修改,请谨慎填写"
                :clearable="true"/>
            </el-form-item>

            <el-form-item
              label="AppId"
              prop="appid">
              <el-input
                v-model="form.appid"
                placeholder="请填写微信公众平台后台的AppId"
                :clearable="true"/>
            </el-form-item>
        <el-form-item
              label="AppSecret"
              prop="appsecret">
              <el-input
                v-model="form.appsecret"
                placeholder="请填写微信公众平台后台的AppSecret"
                :clearable="true"/>
            </el-form-item>
        <el-form-item
          label="图标"
          prop="headimg">
          <el-input
            v-model="form.headimg"
            placeholder="上传公众号图标"
            :clearable="true">
            <template slot="prepend">
              <el-popover
                v-if="form.headimg"
                width="150"
                placement="top"
                trigger="hover">
                <div class="popover-image">
                  <el-image
                    :src="form.headimg | getPreviewUrl"
                    @click.native="$preview(form.headimg)"
                    fit="fill"/>
                </div>
                <yxb-icon slot="reference" name="image"/>
              </el-popover>
            </template>

             <el-button
              slot="append"
              @click="$refs.upload.handleUploadDlg('headimg')">
              <yxb-icon name="upload"/>
            </el-button>
          </el-input>
        </el-form-item>

        <el-form-item
          label="二维码"
          prop="qrcode">
          <el-input
            v-model="form.qrcode"
            placeholder="上传公众号二维码"
            :clearable="true">
            <template slot="prepend">
              <el-popover
                v-if="form.qrcode"
                width="150"
                placement="top"
                trigger="hover">
                <div class="popover-image">
                  <el-image
                    :src="form.qrcode | getPreviewUrl"
                    @click.native="$preview(form.qrcode)"
                    fit="fill"/>
                </div>
                <yxb-icon slot="reference" name="image"/>
              </el-popover>
            </template>
            <el-button
              slot="append"
              @click="$refs.upload.handleUploadDlg('qrcode')">
              <yxb-icon name="upload"/>
            </el-button>
          </el-input>
        </el-form-item>

      </el-form>

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
  </div>
</template>

<script>
import { delGzhList, addGzhItem, setGzhItem } from '@/api/wechat/list'
import util from '@/utils/util'

export default {
  components: {
    'yxbUpload': () => import('@/components/yxb-upload')
  },
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    catData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      multipleSelection: [],
      auth: {
        add: false,
        set: false,
        del: false,
        sort: false,
        url: false,
        enable: false,
        disable: false
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
      textMap: {
        update: '编辑公众号',
        create: '新增公众号'
      },
      catProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      },
      form: {
        intro: undefined,
        name: undefined,
        account: undefined,
        original: undefined,
        level: undefined,
        appid: undefined,
        appsecret: undefined,
        headimg: undefined,
        qrcode: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        account: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        level: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        original: [
          {
            required: true,
            message: '原始id不能为空',
            trigger: 'blur'
          },
          {
            max: 32,
            message: '长度不能大于 32 个字符',
            trigger: 'blur'
          }
        ],
        appid: [
          {
            required: true,
            message: '原始id不能为空',
            trigger: 'blur'
          }
        ],
        appsecret: [
          {
            required: true,
            message: '原始id不能为空',
            trigger: 'blur'
          }
        ],
        headimg: [
          {
            max: 512,
            message: '长度不能大于 512 个字符',
            trigger: 'blur'
          }
        ],
        qrcode: [
          {
            max: 512,
            message: '长度不能大于 512 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'gzh_img') : ''
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$has('/goods/setting/brand/add')
      this.auth.set = this.$has('/goods/setting/brand/set')
      this.auth.del = this.$has('/goods/setting/brand/del')
      this.auth.sort = this.$has('/goods/setting/brand/sort')
      this.auth.url = this.$has('/goods/setting/brand/url')
      this.auth.enable = this.$has('/goods/setting/brand/enable')
      this.auth.disable = this.$has('/goods/setting/brand/disable')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.acid)
        })
      } else {
        idList.push(this.currentTableData[val].acid)
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
        intro: undefined,
        name: undefined,
        account: undefined,
        original: undefined,
        level: undefined,
        appid: undefined,
        appsecret: undefined,
        headimg: undefined,
        qrcode: undefined,
        type: 1
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'create'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求创建
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true

          Promise.all([
            addGzhItem({ ...this.form })
          ])
            .then(res => {
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

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true

          Promise.all([
            setGzhItem({ ...this.form })
          ])
            .then(res => {
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

    // 批量删除
    handleDelete(val) {
      let acid = this._getIdList(val)

      if (acid.length === 0) {
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
          delGzhList(acid)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (acid.indexOf(this.currentTableData[i].acid) !== -1) {
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
    // 打开链接地址
    handleView(url) {
      if (url) {
        this.$open(url)
        return
      }

      this.$message.warning('无效的链接地址')
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
