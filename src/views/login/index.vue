<template>
  <div class="login-container" v-if="!isjcylogin">
    <div class="login-border">
      <div class="login-main">
        <div class="login-logo">
          <img src="~@/assets/image/logo.png" alt="logo">
        </div>
        <loginBox></loginBox>
      </div>
    </div>
  </div>
  <div v-else>
    <jcyLogin></jcyLogin>
  </div>
</template>

<script>
import loginBox from './loginbox'
import jcyLogin from './jcylogin'
export default {
  name: 'login',
  components: {
    loginBox,
    jcyLogin
  },
  data() {
    return {
      activeName: 'user',
      isjcylogin: false
    }
  },
  mounted() {
    if (this.$route.query.type) {
      this.isjcylogin = true
    } else {
      this.isjcylogin = false
    }
  }
}
</script>

<style lang="scss">
  .login-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background-image: url('~@/assets/image/bg.jpg');
    //background-image: url('https://open.saintic.com/api/bingPic/');
    background-size: cover;
  }
  .login-info {
    padding-left: 60px;
  }
  .login-info-title {
    line-height: 90px;
  }
  .login-info-item {
    font-size: 14px;
  }
  .login-border {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px 55px 25px 55px;
    background-color: rgba(255, 255, 255, 0.36);
    border-radius: 6px;
  }
  .login-main {
    border-radius: 3px;
    box-sizing: border-box;
  }
  .login-main > h3 {
    margin-bottom: 20px;
  }
  .login-main > p {
    color: #76838f;
  }
  .login-logo {
    margin: 0 0 20px;
    text-align: center;
  }
  .login-submit {
    margin-top: 20px;
    width: 100%;
  }
  .login-form {
    margin: 10px 0;
    .el-form-item__content {
      width: 310px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-input {
      input {
        text-indent: 5px;
        border-color: #dcdcdc;
        border-radius: 3px;
        line-height: 36px;
        height: 36px;
      }
      .el-input__prefix {
        i {
          padding: 0 5px;
          font-size: 16px !important;
        }
      }
    }
  }
  .login-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 0 0 10px;
  }
  .login-code-img {
    margin-top: 2px;
    box-sizing: border-box;
    width: auto;
    height: 36px;
    background-color: #fdfdfd;
    border: 1px solid #f0f0f0;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 40px;
    text-indent: 5px;
    text-align: center;
  }
</style>
