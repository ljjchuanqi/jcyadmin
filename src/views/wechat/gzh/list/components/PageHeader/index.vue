<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item label="账号" prop="name">
      <el-input
        v-model="form.account"
        prefix-icon="el-icon-search"
        placeholder="请输入账号"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 150px;"
        :clearable="true"/>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input
        v-model="form.name"
        prefix-icon="el-icon-search"
        placeholder="请输入名称"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 150px;"
        :clearable="true"/>
    </el-form-item>
    <el-form-item label="类型" prop="level">
      <el-select
        v-model="form.level"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="订阅号" :value="1"/>
        <el-option label="服务号" :value="2"/>
        <el-option label="认证订阅号" :value="3"/>
        <el-option label="认证服务号/认证媒体/政府订阅号" :value="4"/>
      </el-select>
    </el-form-item>
     <el-form-item label="接入类型" prop="type">
      <el-select
        v-model="form.type"
        placeholder="请选择"
        style="width: 120px;"
        clearable
        value="">
        <el-option label="授权接入" :value="1"/>
        <el-option label="直接接入" :value="2"/>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :disabled="loading"
        @click="handleFormSubmit(true)">
        <yxb-icon name="search"/>
        查询
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleFormReset">
        <yxb-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    catData: {
      default: () => []
    }
  },
  data() {
    return {
      catId: [],
      form: {
        name: undefined,
        status: undefined
      },
      catProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
    },
    handleFormReset(isRestore = false) {
      this.$refs.form.resetFields()
      this.$emit('submit', this.form, isRestore)
    }
  }
}
</script>
