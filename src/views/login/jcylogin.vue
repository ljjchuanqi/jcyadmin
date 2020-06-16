<template>
   <div></div>
</template>

<script>
import '@/components/yxb-icon'
import util from '@/utils/util'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'jcylogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        redomStr: ''
      },
      loading: false
    }
  },
  created() {

  },
  mounted() {
    if (this.$route.query.type) {
      util.cookies.set('loginurl', window.location.href)

      this.handleLogin()
    }
  },
  computed: {
    ...mapState('ldyxb/gzh', [
      'activeAcid'
    ])
  },
  methods: {
    ...mapActions('ldyxb/account', [
      'jcylogin'
    ]),
    ...mapActions('ldyxb/gzh', [
      'set'
    ]),
    /**
     * @description 正式登录
     */
    handleLogin() {
      console.log(this.$route.query.acid)
      util.cookies.set('acid', this.$route.query.acid)
      // 设置公众号
      this.set(this.$route.query.acid)

      // 登录
      const showLoading = this.$loading({
        lock: true,
        text: '跳转中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.loading = true
      this.jcylogin({
        username: this.$route.query.username || '',
        timestamp: this.$route.query.timestamp || '',
        rand: this.$route.query.rand || '',
        tokenexpires: this.$route.query.tokenexpires || '',
        acid: this.$route.query.acid || '',
        signs: this.$route.query.signs || '',
        client_id: this.$route.query.client_id || ''
      })
        .then(() => {
          showLoading.close()
          this.$store.dispatch('ldyxb/account/load')
          this.$router.replace(this.$route.query.redirect || '/')
        })
        .catch(() => {
          showLoading.close()
          this.loading = false
        })
    }
  }
}
</script>
