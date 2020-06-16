<template>
<div>
      <el-input
        v-model.trim="value1"
        type="number"
        min = 0
        prefix-icon="el-icon-search"
        placeholder="请输入起始值"
       style="width: 150px;"
        @keyup.enter.native="handleFormSubmit(true)"
        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" />
        <span style="padding:0 5px;color: #606266">-</span>
        <el-input
        v-model.trim="value2"
        type="number"
        min = 0
        prefix-icon="el-icon-search"
        placeholder="请输入终止值"
       style="width: 150px;"
        @keyup.enter.native="handleFormSubmit(true)"
        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" />
      </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Array,
      default: () => ['', '']
    }
  },
  computed: {
    value1: {
      get() { return this.value[0] },
      set(val) { return this.$emit('input', [val, this.value2]) }
    },
    value2: {
      get() { return this.value[1] },
      set(val) { return this.$emit('input', [this.value1, val]) }
    }
  },
  data() {
    return {
      visible: false,
      buttonTxt: ''
    }
  },
  methods: {

  }
}
</script>
