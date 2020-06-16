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
      :mform_title="mform_title"
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
import { getHistoryList } from '@/api/gzt/message'

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
      },
      mform_title: ''
    }
  },
  computed: {
    ...mapState('ldyxb/gzh', [
      'activeAcid'
    ])
  },
  mounted() {
    let that = this
    console.log(this.$route.query)
    // debugger
    if (!this.$route.query.id) {
      this.$message.error(
        {
          message: '找不到相关数据',
          duration: 2000,
          onClose() {
            that.$router.push({ name: 'gzt-message-history' })
          }
        })
    }
    this.$store.dispatch('ldyxb/db/databasePage', { user: true })
      .then(res => {
        this.page.size = res.get('size').value() || 25
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
      let data = {
        'acid': this.activeAcid,
        'template_id': this.$route.query.id
      }
      form = Object.assign({}, form, data)
      this.loading = true
      getHistoryList({
        ...form,
        page_no: this.page.current,
        page_size: this.page.size
      })
        .then(res => {
          this.page.total = res.data.total_result
          this.table = res.data.total_result > 0 ? res.data.data : []
          this.headertable = res.data.header || []
          this.operate = res.data.operate
          this.mform_title = res.data.mform_title
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
