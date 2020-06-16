<template>
     <div>
      <yxb-upload
      style="display: none"
      ref="upload"
      type="slot"
      accept="image/*"
      :limit="1"
      :multiple="false"
      @confirm="_getUploadFileList"/>
        <el-row v-if="form.audit_state !==2">
          <el-col :span="4">
             <div class="audit-item text-right" style="color:red">
               <template v-for="(v,i) in headerData" >
                    <span v-if="v.name === 'audit_state'" :key="i">
                      {{v.option[form.audit_state]}}
                    </span>
               </template>
             </div>
          </el-col>
          <el-col :span="8">
            <div class="audit-item"></div>
          </el-col>
          <el-col :span="8">
              <div class="audit-item" v-if="form.audit_state !== 2">
                   审核记录
             </div>
          </el-col>
        </el-row>
       <el-form
        :model="form"
        label-width="120px"
        ref="form">
           <template v-for="(item,index) in form">
            <el-row v-if="getObjval(item)&&item.field_info" :key='index' >
                 <el-col :span=4>
                   <div class="audit-item text-right">
                     <span v-if="item.field_info.is_must===1" title="必填" style="color:red">*</span>
                     {{item.field_info.name+'：'}}
                   </div>
                 </el-col>
                 <el-col :span="8">
                   <div class="audit-item">
                     <div
                     v-if="item.field_info.type === 7
                     || item.field_info.type === 8
                     || item.field_info.type === 9
                     || item.field_info.type === 13">
                     {{getItem(item.value,item.field_info.extra)}}
                     </div>
                     <div
                     v-else-if="item.field_info.type === 10
                     || item.field_info.type === 11">
                         <span v-if="!item.value">暂无</span>
                         <div v-else>
                        <template v-for="(v,i) in item.value.split(',')">
                          <a target="_blank" :href="v" :key="i" class="img-wrap">
                            <img :src="v" class="img-wrap"/>
                            </a>
                          </template>
                          </div>
                     </div>
                     <div
                     v-else-if="item.field_info.type === 12">
                         <span v-if="!item.value">暂无</span>
                         <div v-else>
                        <template v-for="(v,i) in item.value.split(',')">
                          <a target="_blank" :href="v" :key="i">附件{{i+1}}下载</a>
                          </template>
                          </div>
                     </div>
                     <div v-else>{{item.value}}</div>

                   </div>

                  </el-col>
                  <el-col :span="10"  v-if="form.audit_state !==2">
                      <div v-if="item.id">
                     <div class="audit-item" v-if="item.audit_state !==3">
                        <template >
                          <el-radio v-model="item.audit_state" :label="2">通过</el-radio>
                          <el-radio v-model="item.audit_state" :label="3" @click.native="auditOut">不通过</el-radio>
                        </template>
                    </div>
                     <el-row v-if="item.audit_state ===3">
                            <el-col :span="12"><el-input class="audit-input" v-model="item.unaudit_tips" placeholder="填写不通过原因" size="mini"></el-input></el-col>
                            <el-col :span="12">
                              <!-- <el-button size="mini" type="primary" plain @click.stop="confirmAudit(index)" style="margin-left:10px">确定</el-button> -->
                              <el-button size="mini" type="warning" plain @click.stop="cancelAudit(index)" style="margin-left:10px">取消</el-button>
                            </el-col>
                          </el-row>
                        </div>
                      <!-- <el-input v-model="treeSetData.newName" placeholder="选项" size="mini"></el-input> -->
                        <!-- <el-button size="mini" type="primary" plain @click.stop="add_area_sure">确定</el-button>
                        <el-button size="mini" type="warning" plain @click.stop="add_area_cancel">取消</el-button> -->
                  </el-col>
            </el-row>
            <!-- <el-form-item :label="item.field_info.name+'：'" :key="index" v-if="getObjval(item) && parseInt(item.type) === 2">
                <span style="padding-left:15px">{{item.option[item]}}</span>
            </el-form-item>
           <el-form-item :label="item.field_info.name+'：'" :key="index"  v-else-if="getObjval(item) && parseInt(item.type) === 3">
              <span v-if="!item.value">暂无</span>
             <template v-for="(v,i) in item.value.split(',')">
               <a target="_blank" :href="v" :key="i" class="img-wrap">
                 <img :src="v"/>
                </a>
              </template>
            </el-form-item>
             <el-form-item :label="item.field_info.name+'：'" :key="index" v-else-if="getObjval(item) && parseInt(item.type) === 7">
                <span style="padding-left:15px" v-html="item.value"></span>
            </el-form-item> -->

            <!-- <el-form-item :label="item.field_info.name+'：'" :key="index" v-if="getObjval(item)">
                <span style="padding-left:15px">{{item.value}}</span>
            </el-form-item> -->
          </template>
      </el-form>
      <el-row  v-if="form.audit_state !==2">
          <el-col :span="4">
             <div class="audit-item">
             </div>
          </el-col>
          <el-col :span="8">
            <div class="audit-item"></div>
          </el-col>
          <el-col :span="8">
              <div class="audit-item">
                   <el-checkbox v-model="selectAllPass" disabled @click.native="handleSwitch()">全部通过</el-checkbox>
             </div>
          </el-col>
        </el-row>
   </div>
</template>

<script>
import util from '@/utils/util'
export default {
  components: {
    'yxbUpload': () => import('@/components/yxb-upload')
  },
  props: {

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
        serverUrl: 'http://jcy.w.qzldkj.com/interface/v3/upload/method/add.upload.list',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/'
      },
      selectAllPass: false
    }
  },
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'gzh_img') : ''
    }
  },
  methods: {
    auditOut() {
      this.selectAllPass = false
    },
    cancelAudit(index) {
      this.form[index].unaudit_tips = ''
      this.form[index].audit_state = 2
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
    getObjval(val) {
      if (Object.prototype.toString.call(val) === '[object Object]') {
        return true
      } else {
        return false
      }
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
          var cache = item
            .split(',')
            .reduce((cache, value) => {
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
    },
    // 开关按钮
    handleSwitch() {
      let txt = ''
      if (this.selectAllPass) {
        this.selectAllPass = false
      } else {
        txt = '是否确认全部通过，该操作将清除所有不通过原因'
        this.$confirm(txt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          for (let obj in this.form) {
            if (this.getObjval(this.form[obj]) && this.form[obj].field_info) {
              this.form[obj].audit_state = 2
              this.form[obj].unaudit_tips = ''
            }
          }

          this.selectAllPass = true
        }).catch(() => {

        })
      }
    }

  }
}
</script>
<style scoped>
.img-wrap{
  overflow: hidden;
  margin:10px;
  max-height: 160px;
  width: 80px;
}
.audit-item{
  padding: 12px;
}
.text-right{
  text-align: right;
}
.text-center{
  text-align: center;
}
.audit-input{
  margin-right: 10px;
}
>>>.el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #ffffff;
    border-color: #DCDFE6;
    cursor: pointer;
}
>>>.el-checkbox__input.is-disabled+span.el-checkbox__label{
  color: #606266;
  cursor: pointer;
}
>>>.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
background-color: #409EFF;
    border-color: #409EFF;
}
>>>.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
}
</style>
