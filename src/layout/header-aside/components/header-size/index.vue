<template>
  <el-dropdown placement="bottom" @command="handleChange">
    <el-button class="yxb-mr btn-text can-hover" type="text">
      <yxb-icon name="font" style="font-size: 16px;"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in options" :key="item.value" :command="item.value">
        <yxb-icon :name="iconName(item.value)" class="yxb-mr-5"/>{{item.label}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'yxb-header-size',
  computed: {
    ...mapState('ldyxb/size', [
      'value'
    ])
  },
  data() {
    return {
      options: [
        { label: '默认', value: 'default' },
        { label: '中', value: 'medium' },
        { label: '小', value: 'small' },
        { label: '最小', value: 'mini' }
      ]
    }
  },
  methods: {
    ...mapMutations({
      pageKeepAliveClean: 'ldyxb/page/keepAliveClean'
    }),
    ...mapActions({
      sizeSet: 'ldyxb/size/set'
    }),
    handleChange(value) {
      this.sizeSet(value)
      this.$message.success('操作成功')
    },
    iconName(name) {
      return name === this.value ? 'dot-circle-o' : 'circle-o'
    }
  }
}
</script>
