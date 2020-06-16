<template>
  <yxb-container :is-back-to-top="true">
    <page-header
      slot="header"
      :header-data="headertable"
      :loading="loading"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :table-data="table"
      :header-data="headertable"
      :operate-data="operate"
      :loading="loading"
      @sort="handleSort"
      @refresh="handleRefresh"/>

    <page-footer
      slot="footer"
      :current="page.current"
      :loading="loading"
      :size="page.size"
      :total="page.total"
      @change="handlePaginationChange"/>
  </yxb-container>
</template>

<script>
// import util from '@/utils/util'
import { mapState } from 'vuex'
import { getSceneList } from '@/api/gzt/formmanage'
import { requestUrl } from '@/api/index/index'

export default {
  name: 'goods-setting-brand',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      loading: true,
      headertable: [],
      table: [],
      operate: {},
      page: {
        current: 1,
        size: 0,
        total: 0
      },
      order: {
        order_type: undefined,
        order_field: undefined
      }
    }
  },
  computed: {
    ...mapState('ldyxb/gzh', [
      'activeAcid'
    ])
  },
  mounted() {
    this.$store.dispatch('ldyxb/db/databasePage', { user: true })
      .then(res => {
        this.page.size = res.get('size').value() || 10
      })
      .then(() => {
        this.handleSubmit()
      })
  },
  methods: {
    // 刷新列表页面
    handleRefresh(isTurning = false) {
      if (isTurning) {
        !(this.page.current - 1) || this.page.current--
      }

      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 分页变化改动
    handlePaginationChange(val) {
      this.page = val
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 排序刷新
    handleSort(val) {
      this.order = val
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    // 提交查询请求
    handleSubmit(form, isRestore = false) {
      if (isRestore) {
        this.page.current = 1
      }
      if (!form) {
        form = {}
      }
      // this.activeAcid
      form = Object.assign(form, { 'acid': this.activeAcid })
      form.is_admin = 0// 是否为管理员表单1-是0-否
      this.loading = true
      getSceneList({
        ...form,
        page_no: this.page.current,
        page_size: this.page.size
      })
        .then(res => {
          this.page.total = res.data.total_result
          this.table = res.data.total_result > 0 ? res.data.data : []
          this.headertable = res.data.header || []
          this.operate = res.data.operate
          this.headertable.forEach(function(val, index) {
            if (val.type === 9) {
              requestUrl(val.option).then(response => {
                val.selects = response.data
              })
            }
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
