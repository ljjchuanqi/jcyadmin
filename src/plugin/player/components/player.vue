<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @close="close">
    <div v-if="dialogVisible" class="player">
      <yxb-video :src="dialogVideoUrl" :mime="dialogVideoMime" :poster="dialogVidePoster"/>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'player',
  components: {
    'yxbVideo': () => import('@/components/yxb-video')
  },
  data() {
    return {
      dialogVisible: false,
      dialogVideoUrl: '',
      dialogVideoMime: '',
      dialogVidePoster: ''
    }
  },
  methods: {
    checkUrl(url) {
      const blob = /^(blob)[^\s]+/
      const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/

      if (!blob.test(url) && !reg.test(url)) {
        return document.location.protocol + '//' + url
      }

      return url
    },
    show(url, mime, poster) {
      this.$nextTick(() => {
        this.dialogVisible = true
        this.dialogVideoUrl = this.checkUrl(url)
        this.dialogVideoMime = mime
        this.dialogVidePoster = this.checkUrl(poster)
      })
    },
    close() {
      this.dialogVisible = false
      this.dialogVideoUrl = ''
      this.dialogVideoMime = ''
      this.dialogVidePoster = ''
    }
  }
}
</script>
