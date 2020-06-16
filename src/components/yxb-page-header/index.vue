<template>
  <el-form
    :inline="true"
    :model="setform"
    class="selfFormHeader"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <template v-for="(item,index) in headerData" >
      <el-form-item :label="item.label" :prop="item.name" :key="index" v-if="item.is_search && item.type==1">
        <el-input
          v-model.trim="form[item.name]"
          prefix-icon="el-icon-search"
          :placeholder='"请输入"+item.label'
          @keyup.enter.native="handleFormSubmit(true)"
          style="width: 150px;"
          :clearable="true"/>
      </el-form-item>
       <el-form-item :label="item.label" :prop="item.name" :key="index" v-if="item.is_search && item.type==2">
         <el-select v-model="form[item.name]" :placeholder='"请选择"+item.label' style="width: 150px;">
          <el-option :label="v" :value="i" v-for="(v,i) in item.option" :key=i></el-option>
        </el-select>
      </el-form-item>

       <el-form-item :label="item.label" :prop="item.name" :key="index" v-else-if="item.is_search && item.type==4">
            <el-date-picker
              v-model="form[item.name]"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
      </el-form-item>
      <el-form-item :label="item.label" :prop="item.name" :key="index" v-else-if="item.is_search && item.type==5">
            <el-date-picker
              v-model="form[item.name]"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
      </el-form-item>
      <el-form-item :label="item.label" :prop="item.name" :key="index" v-else-if="item.is_search && item.type==8">
          <yxb-number-container v-model="form[item.name]"></yxb-number-container>
      </el-form-item>
      <el-form-item :label="item.label" :prop="item.name" :key="index" v-else-if="item.is_search && item.type==9">
        <el-select v-model="form[item.name]" collapse-tags :placeholder='"请选择"+item.label'  @visible-change="change(item)">
        <div class="el-input" style="width:90%;margin-left:5%;">
          <input type="text" :placeholder='"请输入"+item.label' class="el-input__inner" v-model.trim="item.dropDownValue" @input="dropDownSearch(item)">
        </div>
        <el-option v-for="(v,i) in optionsMetaShow" :value="parseInt(v.id)" :label="v.name" :key="i"></el-option>
      </el-select>
      </el-form-item>
    </template>
    <el-form-item v-if="show_search">
      <el-button
        type="primary"
        :disabled="loading"
        @click="handleFormSubmit(true)">
        <yxb-icon name="search"/>
        查询
      </el-button>
    </el-form-item>

    <el-form-item v-if="show_search">
      <el-button
        @click="handleFormReset">
        <yxb-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { getFanswelfareScenetype } from '@/api/membercenter/list'
export default {
  props: {
    loading: {
      default: false
    },
    headerData: {
      type: Array,
      default: () => []
    },
    queryObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show_search: false,
      form: {},
      optionsMetaShow: []
    }
  },
  watch: {
    headerData: {
      handler(val) {
        this.show_search = val.some(function(item) {
          return item.is_search
        })
      },
      immediate: true
    }
  },
  computed: {
    setform() {
      // console.log(this.queryObj)
      // if (this.queryObj && Object.keys(this.queryObj).length > 0) {
      //   Object.assign(this.form, this.queryObj)
      // }
      return this.form
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
    },
    handleFormReset(isRestore = false) {
      this.$refs.form.resetFields()
      this.form = {}
      this.$emit('submit', this.form, isRestore)
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
    }
  }
}
</script>
<style>
.selfFormHeader .el-scrollbar {
  display: block !important;
}
</style>
