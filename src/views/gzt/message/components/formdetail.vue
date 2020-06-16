<template>
     <div>
       <el-form
        :model="form"
        label-width="110px"
        :rules="rules"
        ref="form">
            <el-form-item name="typename" label="表单类型:">
            <el-input
                v-model.trim="form.typename"
                placeholder="请输入表单类型"
                disabled=""
                style="width: 180px;"
                :clearable="true"/>
            </el-form-item>
             <el-form-item name="reg" label="输入类型:" v-if="form.type.toString()==='1' && !form.foreign_key">
             <el-select v-model="form.reg" placeholder="默认">
                  <el-option
                    v-for="item in regOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item name="name" label="字段名称:" prop="name">
            <el-input
                v-model.trim="form.name"
                placeholder="请输入字段名称"
                style="width: 180px;"
                :clearable="true"/>
            </el-form-item>
            <!-- <el-form-item prop="is_must" label="填写条件:">
              <el-checkbox v-model.trim="form.is_must">必填</el-checkbox>
            </el-form-item> -->
             <el-form-item name="is_must" label="填写条件:" v-if="!form.foreign_key">
               <el-checkbox v-model="form.is_must" :true-label='1' :false-label='0'>必填</el-checkbox>
            </el-form-item>
             <el-form-item name="default" label="默认值:" v-if="!['4','5','6','7','8','9','10','11','12','13'].includes(form.type.toString())">
             <el-input
                v-model.trim="form.default"
                placeholder="请输入默认值"
                style="width: 180px;"
                :clearable="true"/>
            </el-form-item>
             <el-form-item name="validate_rule" label="验证规则:" v-if="!['6','7','8','9','13'].includes(form.type.toString())">
             <el-input
                v-model.trim="form.validate_rule"
                placeholder="请输入验证规则"
                style="width: 180px;"
                :clearable="true"/>
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click">
                  <h5 class="tit">多个规则可以叠加,以"|"隔开， 如 number|integer</h5>
                  <p>规则对应列表，如下:</p>
                  <div class="tssm-wrap">
                   <el-row :gutter="20">
                     <el-col :span="12">number(字段的值为纯数字)</el-col>
                     <el-col :span="12">integer(字段的值为整数)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">float(字段的值为浮点数字)</el-col>
                     <el-col :span="12">boolean或者bool(字段的值为布尔值)</el-col>
                  </el-row>
                   <el-row :gutter="20">
                     <el-col :span="12">Email(字段的值为email地址)</el-col>
                     <el-col :span="12">Array(字段的值为数组)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">Accepted(字段为 yes, on, 或是 1)</el-col>
                     <el-col :span="12">date(验证值为有效的日期)</el-col>
                  </el-row>
                   <el-row :gutter="20">
                     <el-col :span="12">alpha(字段的值为纯字母)</el-col>
                     <el-col :span="12">alphaNum(字段的值为字母和数字)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">alphaDash(字段的值为字母和数字，下划线_及破折号-)</el-col>
                     <el-col :span="12">chs(字段的值只能是汉字)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">chsAlpha(字段的值只能是汉字、字母)</el-col>
                     <el-col :span="12">chsAlphaNum(字段的值只能是汉字、字母和数字)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">chsDash(字段的值只能是汉字、字母、数字和下划线_及破折号-)</el-col>
                     <el-col :span="12">cntrl(字段的值只能是控制字符（换行、缩进、空格）)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">graph(字段的值只能是可打印字符（空格除外）)</el-col>
                     <el-col :span="12">print(字段的值只能是可打印字符（包括空格）)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">lower(字段的值只能是小写字符)</el-col>
                     <el-col :span="12">upper(字段的值只能是大写字符)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">space(字段的值只能是空白字符（包括缩进，垂直制表符，换行符，回车和换页字符）)</el-col>
                     <el-col :span="12">xdigit(字段的值只能是十六进制字符串)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">activeUrl(字段的值为有效的域名或者IP)</el-col>
                     <el-col :span="12">url(字段的值为有效的URL地址)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">ip(字段的值为有效的IP地址支持验证ipv4和ipv6格式的IP地址)</el-col>
                     <el-col :span="12">dateFormat:format(字段的值为指定格式的日期，例如：'create_time'=>'dateFormat:y-m-d')</el-col>
                  </el-row>
                   <el-row :gutter="20">
                     <el-col :span="12">mobile(字段的值为有效的手机)</el-col>
                     <el-col :span="12">idCard(字段的值为有效的身份证格式)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">macAddr(字段的值为有效的MAC地址)</el-col>
                     <el-col :span="12">zip(字段的值为有效的邮政编码长度和区间验证类)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">in(字段的值在某个范围，例如：in:1,2,3)</el-col>
                     <el-col :span="12">notIn(字段的值不在某个范围，例如：notIn:1,2,3)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">between(字段的值在某个区间，例如：between:1,10)</el-col>
                     <el-col :span="12">notBetween(字段的值不在某个范围，例如：notBetween:1,10)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">length:num1,num2(字段的值的长度在某个范围，例如：length:4,25)</el-col>
                     <el-col :span="12">length:num(指定长度 例如length:4)</el-col>
                  </el-row>
                   <el-row :gutter="20">
                     <el-col :span="12">max:number(字段的值的最大长度，例如：max:25)</el-col>
                     <el-col :span="12">min:number(字段的值的最小长度，例如：min:5)</el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="12">after:日期(字段的值在某个日期之后，例如：after:2016-3-18)</el-col>
                     <el-col :span="12">before:日期(字段的值在某个日期之前，例如：before:2016-10-01)</el-col>
                  </el-row>
                  </div>
                   <el-button type="text" slot="reference" style="text-decoration: underline;margin-left:10px">填写说明</el-button>

                </el-popover>
            </el-form-item>
             <el-form-item name="error_info" label="验证失败提示:" prop="error_info">
             <el-input
                v-model.trim="form.error_info"
                placeholder="请输入验证失败提示"
                style="width: 180px;"
                :clearable="true"/>
            </el-form-item>
            <el-form-item name="placeholder" label="填写提示:">
             <el-input
                v-model.trim="form.placeholder"
                placeholder="请输入填写提示"
                style="width: 180px;"
                :clearable="true"/>
            </el-form-item>
             <el-form-item name="remark" label="备注:">
              <el-input
                  v-model.trim="form.remark"
                  placeholder="请输入备注"
                  style="width: 180px;"
                  :clearable="true"/>
              </el-form-item>
             <el-form-item name="is_show_front" label="页面展示:" v-if="!form.foreign_key">
             <el-switch v-model="form.is_show_front"
                            :active-value="1"
                            :inactive-value="0">
                          </el-switch>
              </el-form-item>
              <el-form-item name="is_modify" label="提交通过后:">
              <template>
                <el-radio v-model="form.is_modify" :label="0">不可修改</el-radio>
                <el-radio v-model="form.is_modify" :label="1">可修改</el-radio>
              </template>
              <span class="desc-info">说明：设置表单审核后再次提交表单时，且该字段为审核通过时，该字段是否可以修改。</span>
            </el-form-item>
             <!-- <el-form-ite
            <el-form-item name="is_show" label="列表显示:" v-if="!form.foreign_key">
               <el-switch v-model="form.is_show"
                            :active-value="1"
                            :inactive-value="0">
                          </el-switch>
            </el-form-item>

             <!-- <el-form-item name="is_search" label="是否搜索:">
             <el-select v-model="form.is_search" placeholder="请选择">
                  <el-option label="否" :value="0"></el-option>
                   <el-option label="是" :value="1"></el-option>
                </el-select>
            </el-form-item> -->
             <el-form-item label="新增选项:" v-if="form.type.toString() === '7' || form.type.toString() === '8' || form.type.toString() === '9' || form.type.toString() === '13'">
               <el-row :gutter="20">
                 <el-button type="text" @click="add_new_Area" class="button-style"><i class="el-icon-plus" style="margin-right:5px"></i>添加选项内容</el-button>

                 <el-row class="add_question" v-show="treeSetData.addNodeFlg">
                    <el-col :span="10" style="margin:0px 5px">
                        <el-input v-model="treeSetData.newName" placeholder="选项" size="mini"></el-input>
                    </el-col>
                    <el-col :span="10">
                        <el-button size="mini" type="primary" plain @click.stop="add_area_sure">确定</el-button>
                        <el-button size="mini" type="warning" plain @click.stop="add_area_cancel">取消</el-button>
                    </el-col>
                </el-row>

               </el-row>
             </el-form-item>
             <el-form-item label="选项内容:" class="area-tree" v-if="form.type.toString() === '7' || form.type.toString() === '8' || form.type.toString() === '9' || form.type.toString() === '13'">
              <el-tree
                  v-if="treeSetData.editFlg"
                  ref="tree"
                  :key="treeSetData.tree_key"
                  :data="treeSetData.treeData"
                  node-key="id"
                  :render-content="renderContent"
                  :expand-on-click-node="false"
                  :default-expand-all="treeSetData.defaultExpandAll"
                  highlight-current
                  @node-click="handleNodeClick"
                  class="tree-style"
              ></el-tree>
              <el-tree
                  v-else
                  ref="tree"
                  :key="treeSetData.tree_key"
                  :data="treeSetData.treeData"
                  node-key="id"
                  :render-content="renderContent"
                  :expand-on-click-node="false"
                  :default-expand-all="treeSetData.defaultExpandAll"
                  highlight-current
                  class="tree-style"
              ></el-tree>
             </el-form-item>

      </el-form>
   </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    treeSetData: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  data() {
    return {
      regOptions: [{
        value: '',
        label: '默认'
      }, {
        value: 'email',
        label: '邮件'
      },
      {
        value: 'search',
        label: '搜索'
      }],
      selectItem: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectItemsArr: [],
      selectItemsNo: 1,
      selectIndex: 1,
      rules: {
        name: [
          { required: true, message: '请输入字段名称', trigger: 'blur' }
        ],
        error_info: [
          { required: true, message: '请输入验证失败提示', trigger: 'blur' }
        ]
      }
    }
  },
  filters: {

  },
  methods: {
    addSelectItem() {
      if (!this.selectItem) {
        this.$message.error('请填写选项内容')
      } else {
        let obj = {}
        obj.value = this.selectItemsNo
        obj.label = this.selectItem
        let arr = this.form.selectItemsArr || []
        arr.push(obj)
        this.selectItemsNo++
        // this.selectItemsArr.push(obj)
        this.$set(this.form, 'selectItemsArr', arr)
      }
    },
    remove(obj) {
      let i = this.selectItemsArr.findIndex((value, index, arr) => {
        return value === obj
      })
      this.selectItemsArr.splice(i, '1')
    },
    handleNodeClick() {

    },
    allowDrop(draggingNode, dropNode, type) {
      return type !== 'inner'
    },
    add_new_Area() {
      this.treeSetData.addNodeFlg = true
    },
    add_area_sure() {
    // 添加节点数据，因为是最上层，所以默认父ID是pid，id的话是我初始化设置的【defaultId】的自加，大家自己在data中加一下【defaultId】字段就可以了
      const nodeObj = {
        id: new Date().getTime(),
        name: this.treeSetData.newName,
        isEdit: false,
        children: [],
        pid: 0
      }
      this.treeSetData.treeData.push(nodeObj)
      this.treeSetData.addNodeFlg = false
      this.treeSetData.newName = ''
      this.treeSetData.addList.push(nodeObj)
    },
    add_area_cancel() {
      this.treeSetData.addNodeFlg = false
      this.treeSetData.newName = ''
    },
    renderContent(h, { node, data, store }) {
      if (this.treeSetData.editFlg === false) {
        if (this.form.type.toString() === '13') {
          return (
            <span class='tree-span'>
              <span>{this.showOrEdit(data)}</span>
              <div class='tree_node_op'>
                <i class='el-icon-edit' on-click={ev => this.nodeEdit(ev, store, data)} style='padding-left: 10px;'></i>
                <i class='el-icon-circle-plus' on-click={() => this.nodeAdd(node, data)} style='margin-left: 5px;'></i>
                <i class='el-icon-remove' on-click={() => this.nodeDelete(node, data)} style='margin-left: 5px;'></i>
              </div>
            </span>
          )
        } else {
          return (
            <span class='tree-span'>
              <span>{this.showOrEdit(data)}</span>
              <div class='tree_node_op'>
                <i class='el-icon-edit' on-click={ev => this.nodeEdit(ev, store, data)} style='padding-left: 10px;'></i>
                <i class='el-icon-remove' on-click={() => this.nodeDelete(node, data)} style='margin-left: 5px;'></i>
              </div>
            </span>
          )
        }
      } else {
        return (
          <span class='tree-span'>
            <span>{this.showOrEdit(data)}</span>
            <div class='tree_node_op'>
            </div>
          </span>
        )
      }
    },

    // 节点编辑
    showOrEdit(data) {
      if (data.isEdit) {
        return (
          <input
            type='text'
            value={data.name}
            on-blur={ev => this.edit_sure(ev, data)}
            size='mini'
            class='el-input__inner input-style'
          ></input>
        )
      } else {
        return <span className='node_labe'>{data.name}</span>
      }
    },
    nodeEdit(ev, store, data) {
      data.isEdit = true
      this.$nextTick(() => {
        const $input =
          ev.target.parentNode.parentNode.querySelector('input') ||
          ev.target.parentElement.parentElement.querySelector('input')
        !$input ? '' : $input.focus()
      })
    },

    // 确认编辑
    edit_sure(ev, data) {
      const $input =
            ev.target.parentNode.parentNode.querySelector('input') ||
            ev.target.parentElement.parentElement.querySelector('input')
      if (!$input) {
        return false
      } else {
        data.name = $input.value
        data.isEdit = false
      }
      // 修改编辑树形数据的内容
      let editFilter = this.treeSetData.editList.filter((item) => item.id === data.id)
      if (editFilter.length === 0) {
        this.treeSetData.editList.push(data)
      } else {
        this.treeSetData.editList.forEach((item, i) => {
          if (item.id === data.id) {
            this.treeSetData.editList[i].name = data.name
          }
        })
      }
    },

    // 增加节点
    nodeAdd(node, data) {
      // data.pid !== 0
      const newChild = { id: new Date().getTime(), name: '新增的选项', isEdit: false, pid: data.id, children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.treeSetData.addList.push(newChild)
    },

    // 节点删除
    nodeDelete(node, data) {
      this.treeSetData.deleteList.push(data)
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">
  .tree-scroll {
    max-height: 2000px;
    overflow: auto;
    padding-bottom: 1px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .brother-showing i {
    width: 16px;
  }
  .active {
    display: none;
  }
  .action:hover .active{
    display: block;
  }
  .move-tree {
    color: $color-text-placehoder;
    cursor: move;
  }

  .box-card {
    border-radius: 0;
    border: 1px solid $color-border-1;
  }
  .el-message-box {
    width: 450px;
  }
  .button-style {
    padding: 0px
  }
  .input-style {
    height: 30px;
    width: 140px;
  }
  .through-panel-body {
    padding-top:12px;
    width: 100%;
    display: flex;
  }
  .through-panel-body .panel-area-left {
    position: relative;
    width: 360px;
    border:2px solid rgba(240,240,240,1);
    border-radius: 5px;
  }
  .through-panel-body .panel-area-left .head-title {
    display:flex;
    justify-content: space-between;
    padding:10px 10px;
  }
  .through-panel-body .panel-area-left .head-title h5 {
    border-left:solid 3px #FB8742;
    padding-left:5px;
    height: 20px;
    line-height:20px;
    font-size:16px;
  }

  .area-tree .tree-style {
    margin: 0px 0px 10px 10px;
    max-height: 200px;
    overflow-y: auto;
  }
  .el-tree-node__content {
    padding-left: 10px;
    display: flex;
    width: 100%;
    height: auto;
  }
  .tree-span {
    display: flex;
    width: 100%;
  }
  .tree_node_op {
    margin-left: 10px;
    color: #D3D3D3;
  }
  .add_question {
    margin: 10px 0px;
  }
  .foot-style {
    padding-right:5px;
    height: 40px;
    text-align: right;
  }
  .panel-area-right {
    margin-right: 5px;
    width: 100%;
    padding-left: 15px;
    height: 100%;
  }
  .panel-area-right .el-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .panel-area-right .el-row .located-class {
    width: 50%;
  }
  .panel-area-right .el-row .device-floor-class {
    width: 50%;
    display: flex;
    justify-content: flex-end;
  }
  .tit{
    font-size:16px;
    font-weight: bold;
    text-align: center;
    margin:10px auto
  }
  .tssm-wrap{
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .tssm-wrap .el-row{
    padding: 5px 0;
    color: #888888;
  }
  .desc-info{
    color: #cccccc;
  }
</style>
