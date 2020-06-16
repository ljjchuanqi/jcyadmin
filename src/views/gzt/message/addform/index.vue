<template>
  <yxb-container :is-back-to-top="true">
    <div class="yxb-container-full__header">
      <div class="content">
        <div class="m_container">
          <div class="box">
            <el-form :model="formMessage" label-width="100px">
              <el-row>
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
                <el-form-item name="template" label="短信内容:">
                  <el-input
                    type="textarea"
                    :rows="6"
                    maxlength="200"
                    v-model.trim="formMessage.template"
                    placeholder="请输入短信内容"
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
      <div class="dialog-footer">
        <el-button
          type="primary"
          :loading="btnloading"
          @click="HandleSmsTemplate"
          >提交</el-button
        >
        <el-button @click="back">返回</el-button>
      </div>
    </div>
  </yxb-container>
</template>

<script>
import { mapState } from 'vuex'
import {
  addSmsTemplate,
  editSmsTemplate,
  getSmsTemplateDetail
} from '@/api/gzt/formmanage'
var _that
export default {
  components: {},
  data() {
    return {
      id: '',
      btnloading: false,
      // 短信模板数据
      messageTemplateData: [],
      // 短信模板
      formMessage: {
        title: '',
        signname: '',
        template: ''
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
        }
      ],
      delMessageing: false, // 删除短信锁
      templateNumOfWords: '',
      messageCount: 0,
      // 可插入变量
      variable1: [],
      variable2: []
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
    this.id = this.$route.query.id

    // 加载详情
    if (this.id) {
      if (this.btnloading) {
        return false
      }
      this.btnloading = true
      let data = {
        id: this.id
      }

      Promise.all([getSmsTemplateDetail(data)])
        .then(res => {
          this.formMessage = res[0].data
          let that = this
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 2000,
            onClose() {
              that.btnloading = false
            }
          })
        })
        .catch(res => {
          this.btnloading = false
        })
    }
  },
  computed: {
    ...mapState('ldyxb/gzh', ['activeAcid'])
  },
  methods: {
    toBoolen(val) {
      return val === 1
    },
    getTypeName(type) {
      let arr = this.options.filter((item, index) => {
        return item.value === type
      })
      this.form.typename = arr.length > 0 ? arr[0].label : ''
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
    back() {
      this.$router.push({
        name: 'gzt-message-list'
      })
    },
    // 短信模板提交
    HandleSmsTemplate() {
      if (this.btnloading) {
        return false
      }
      this.btnloading = true
      let data = this.formMessage
      // 增加
      if (!this.id) {
        data.acid = this.activeAcid
        Promise.all([addSmsTemplate(data)])
          .then(res => {
            let that = this
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 2000,
              onClose() {
                that.btnloading = false
                that.$router.push({ name: 'gzt-message-list' })
              }
            })
          })
          .catch(res => {
            this.btnloading = false
          })
      } else {
        // 更新
        Promise.all([editSmsTemplate(data)])
          .then(res => {
            let that = this
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 2000,
              onClose() {
                that.btnloading = false
                that.$router.push({ name: 'gzt-message-list' })
              }
            })
          })
          .catch(res => {
            this.btnloading = false
          })
      }
    },
    // 计算短信占用条数
    computeMessageCount() {
      this.templateNumOfWords = this.formMessage.template.length
      this.messageCount = Math.floor(this.formMessage.template.length / 65)
    }
  }
}
</script>

<style lang="scss" scoped>
.yxb-container-full__body {
  padding: 20px;
}
.el-form-item__label {
  text-align: left;
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
  left: 0;
  top: 60px;
  right: 0;
  width: 250px;
  margin: 0 auto;
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
