<template>
  <yxb-container :is-back-to-top="true" parent-path="setting-logistiyxb-delivery">
    <page-header
      slot="header"
      :title="title"/>

    <page-main
      :table-data="table"
      :loading="loading"/>
  </yxb-container>
</template>

<script>
import { getDeliveryAreaList } from '@/api/logistics/area'
import { getDeliveryCompanyItem } from '@/api/logistics/company'

export default {
  name: 'setting-logistiyxb-delivery-area',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain')
  },
  computed: {
    changeData() {
      const { delivery_id, delivery_item_id } = this.$route.params
      return {
        delivery_id,
        delivery_item_id
      }
    }
  },
  watch: {
    changeData: {
      handler(val) {
        this.getAreaData(val)
      },
      immediate: true
    }
  },
  data() {
    return {
      title: '',
      table: [],
      loading: true
    }
  },
  methods: {
    getAreaData(val) {
      this.$nextTick(() => {
        this.title = ''
        this.table = []
        this.loading = true
      })

      // 父级数据列表会变更,所以子级页面使用动态获取
      Promise.all([
        getDeliveryCompanyItem(val.delivery_item_id),
        getDeliveryAreaList({ delivery_id: val.delivery_id })
      ])
        .then(res => {
          if (res[0].data) {
            this.title = res[0].data.name
          }

          if (res[1].data) {
            this.table = res[1].data
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
