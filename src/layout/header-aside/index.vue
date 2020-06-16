<template>
  <div
    class="yxb-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="yxb-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="yxb-layout-header-aside-content" flex="dir:top">
      <div>
        <el-alert
          v-if="isExperience"
          title="为了实现较好的用户体验，建议您使用 Chrome 或 Firefox 游览器。"
          style="border-radius: 0;"
          type="warning"
          effect="dark"
          center
          show-icon>
        </el-alert>
      </div>
      <!-- 顶栏 -->
      <div
        class="yxb-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex>
        <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0">
          <a href="./">
            <img v-if="asideCollapse" :src="`${$publicPath}image/theme/${themeActiveSetting.name}/logo/icon-only.png`" alt="">
            <img v-else :src="`${$publicPath}image/theme/${themeActiveSetting.name}/logo/all.png`" alt="">
          </a>
        </div>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <yxb-icon name="bars"/>
        </div>
        <yxb-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div class="yxb-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <!-- <yxb-header-gzh/> -->
          <yxb-header-log v-if="$env === 'development'"/>
          <yxb-header-search @click="handleSearchClick"/>
          <yxb-header-fullscreen/>
          <!-- <yxb-header-theme/> -->
          <yxb-header-size/>
          <yxb-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="yxb-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="yxb-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          <yxb-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="yxb-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="yxb-theme-container-main-layer" flex>
              <yxb-panel-search
                ref="panelSearch"
                @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="yxb-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="yxb-theme-container-main-header" flex-box="0">
                <yxb-tabs/>
              </div>
              <!-- 页面 -->
              <div class="yxb-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import yxbMenuSide from './components/menu-side'
import yxbMenuHeader from './components/menu-header'
import yxbTabs from './components/tabs'
import yxbHeaderFullscreen from './components/header-fullscreen'
import yxbHeaderSearch from './components/header-search'
import yxbHeaderSize from './components/header-size'
// import yxbHeaderTheme from './components/header-theme'
// import yxbHeaderGzh from './components/header-gzh'
import yxbHeaderUser from './components/header-user'
import yxbHeaderLog from './components/header-log'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
import util from '@/utils/util'
export default {
  name: 'yxb-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    'yxbMenuSide': yxbMenuSide,
    'yxbMenuHeader': yxbMenuHeader,
    'yxbTabs': yxbTabs,
    'yxbHeaderFullscreen': yxbHeaderFullscreen,
    'yxbHeaderSearch': yxbHeaderSearch,
    'yxbHeaderSize': yxbHeaderSize,
    // 'yxbHeaderTheme': yxbHeaderTheme,
    // 'yxbHeaderGzh': yxbHeaderGzh,
    'yxbHeaderUser': yxbHeaderUser,
    'yxbHeaderLog': yxbHeaderLog
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      // 操作体验提醒
      isExperience: false
    }
  },
  computed: {
    ...mapState('ldyxb', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      uaData: state => state.ua.data
    }),
    ...mapGetters('ldyxb', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    ...mapState('ldyxb/gzh', [
      'activeAcid'
    ]),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$publicPath}${this.themeActiveSetting.backgroundImage}')`
          // backgroundImage: `url("https://open.saintic.com/api/bingPic/")`
        } : {}
      }
    }
  },
  created() {
    if (!this.activeAcid) {
      // this.$message.warning('您还未选择公众号，请在右上方选择')
      this.set(util.cookies.get('acid'))
    }
    console.log(this.activeAcid)
    const { engine } = this.uaData
    if (engine.name && engine.name.toLowerCase() === 'trident') {
      this.isExperience = true
    }
  },
  methods: {
    ...mapActions('ldyxb/menu', [
      'asideCollapseToggle'
    ]),
    ...mapActions('ldyxb/gzh', [
      'set'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
.logo-group {
  img {
    border: none
  }
}
</style>
