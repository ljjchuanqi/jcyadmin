<template>
  <yxb-container :is-back-to-top="true" parent-path="system-article-article">
    <page-edit
      state="create"
      :loading="loading"
      :catList="catList"
      :catData="catData">
    </page-edit>
  </yxb-container>
</template>

<script>
import util from '@/utils/util'
import { getArticleCatList } from '@/api/article/cat'

export default {
  name: 'system-article-article-create',
  components: {
    'PageEdit': () => import('./components/PageEdit')
  },
  data() {
    return {
      // 加载状态
      loading: true,
      // 分类源数据
      catList: [],
      // 整理后的分类数据
      catData: []
    }
  },
  mounted() {
    getArticleCatList(null)
      .then(res => {
        this.catList = res.data.length > 0 ? res.data : []
        if (this.catList.length) {
          this.catData = util.formatDataToTree(this.catList, 'article_cat_id')
        }
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
