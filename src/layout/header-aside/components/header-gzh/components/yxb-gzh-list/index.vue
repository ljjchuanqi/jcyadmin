<template>
<div>
  <page-header slot="header" :loading="loading" @submit="handleSubmit"  ref="header"/>
  <el-table :data="list" height="350" v-bind="table"  style="margin:15px auto 20px">
    <el-table-column label="公众号名称" prop="name" align="center" width="160"/>
    <el-table-column label="图标" align="center" width="120" >
      <template slot-scope="scope">
         <el-image v-if="scope.row.headimg"
                class="gzh-image"
                @click="handleView(scope.row.headimg)"
                :src="scope.row.headimg | getPreviewUrl"
                fit="contain"
                lazy/>
        <!-- <div  class="gzh-preview" :style="{'backgroundImage': 'url('+scope.row.headimg+')'}"></div> -->
        <div v-else>暂无</div>
      </template>
    </el-table-column>
    <el-table-column label="二维码" align="center" width="120" >
      <template slot-scope="scope">
      <el-image v-if="scope.row.qrcode"
                class="gzh-image"
                @click="handleView(scope.row.qrcode)"
                :src="scope.row.qrcode | getPreviewUrl"
                fit="contain"
                lazy/>
       <div v-else>暂无</div>
      </template>
    </el-table-column>
    <el-table-column label="操作" prop="address" align="center">
      <template slot-scope="scope">
        <el-button v-if="activeAcid === scope.row.acid" type="success" icon="el-icon-check" round>已选择</el-button>
        <el-button v-else round @click="handleSelectGzh(scope.row.acid)">选择</el-button>
      </template>
    </el-table-column>
  </el-table>
   <page-footer
      slot="footer"
      :current="page.current"
      :loading="loading"
      :size="page.size"
      :total="page.total"
      @change="handlePaginationChange"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getGzhList } from '@/api/gzh/gzh'
import util from '@/utils/util'
export default {
  name: 'yxb-gzh-list',
  components: {
    'PageHeader': () => import('../PageHeader'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      loading: false,
      table: {
        showHeader: true,
        border: true
      },
      list: [],
      page: {
        current: 1,
        size: 0,
        total: 0
      }
    }
  },
  mounted() {
    this.$store.dispatch('ldyxb/db/databasePage', { user: true })
      .then(res => {
        this.page.size = res.get('size').value() || 25
      })
      .then(() => {
        this.handleSubmit()
      })
  },
  computed: {
    ...mapState('ldyxb/gzh', [
      'activeAcid'
    ])
  },
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'gzh_img') : ''
    }
  },
  methods: {
    ...mapActions('ldyxb/gzh', [
      'set'
    ]),
    ...mapActions('ldyxb/page', [
      'close',
      'closeLeft',
      'closeRight',
      'closeOther',
      'closeAll'
    ]),
    handleSelectGzh(acid) {
      this.set(acid)
      this.closeAll()
    },
    // 打开链接地址
    handleView(url) {
      if (url) {
        this.$open(url)
        return
      }

      this.$message.warning('无效的链接地址')
    },
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
    handleSubmit(form, isRestore = false) {
      // console.log(form, 1)
      // if (!form) {
      //   form = {
      //     acid: this.activeAcid
      //   }
      // }
      // console.log(form, 2)
      if (isRestore) {
        this.page.current = 1
      }

      this.loading = true
      getGzhList({
        ...form,
        page_no: this.page.current,
        page_size: this.page.size
      })
        .then(res => {
          this.page.total = res.data.total_result
          this.list = res.data.total_result > 0 ? res.data.items : []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.gzh-preview {
  height: 80px;
  width: 80px;
  margin: auto;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
.gzh-image {
    width: 80px;
    height: 80px;
    &:hover {
      cursor: pointer;
    }
  }
</style>
