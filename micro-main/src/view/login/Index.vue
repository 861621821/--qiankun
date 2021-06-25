<template>
  <div class="login">
    <login-header showWork></login-header>
    <login-card>
      <div class="login-wechat">
        <img
          class="login-wechat__logo"
          src="@/assets/images/wechat_s.png"
          alt=""
        />
        <span class="login-title">微信扫码登录</span>
      </div>
      <div
        class="login-wechat__code qy-mtop__3"
        v-loading="wechatCodeLoading"
        element-loading-spinner="el-icon-loading"
        :element-loading-text="loadingText"
        element-loading-custom-class="login-loading"
      >
        <img :src="wechatCode" alt="" />
      </div>
      <div class="login-info" style="margin-top: 8px">
        请使用微信扫描二维码登录
      </div>
      <div style="margin-top: 14px">
        <span class="login-info login-tips">扫码即同意</span>
        <span class="login-regular is-link" @click="fn_jumpToAgreement"
          >《零一无限增长用户协议》</span
        >
      </div>
    </login-card>

    <login-footer></login-footer>
  </div>
</template>

<script>
// 页面布局
import loginHeader from './components/LoginHeader'
import loginCard from './components/LoginCard'
import loginFooter from './components/LoginFooter'
export default {
  name: 'login',
  data () {
    return {
      wechatCodeLoading: true,
      wechatCode: require('@/assets/images/wechat_code_default.png'),
      wechatScene: '',
      wechatInterval: null,
      wechatTimeGap: 1000,
      loadingText: '二维码加载中，请稍等'
    }
  },

  async created () {
    await this.fn_getWechatCode()
    this.wechatInterval = setInterval(() => {
      // 监听过程中，如有其他标签页登录，则停止监听
      const _token = localStorage.getItem('token')

      if (_token) {
        this.wechatCodeLoading = true
        this.loadingText = '登录中...'
        clearInterval(this.wechatInterval)

        const _type = localStorage.getItem('type')

        if (_type === 'wecom') {
        } else {
          this.$router.replace('/company')
        }
      } else {
        this.fn_loginWechat()
      }
    }, this.wechatTimeGap)
  },

  destroyed () {
    if (this.wechatInterval) {
      clearInterval(this.wechatInterval)
    }
  },

  methods: {
    // 获取微信登录二维码
    async fn_getWechatCode () {
      const data = await this.$http.get('/account/auth/wechatQrcode')
      this.wechatCode = data.url
      this.wechatScene = data.scene
      this.wechatCodeLoading = false
    },

    // 监听微信扫码
    async fn_loginWechat () {
      const data = await this.$http.post('/account/auth/loginByScene', {
        scene: this.wechatScene
      })

      // 如果返回中存在 token 字段，则登录成功，清除扫码监听
      if (data.token) {
        clearInterval(this.wechatInterval)

        // 用户感知，一秒加载状态
        this.wechatCodeLoading = true
        this.loadingText = '登录中...'

        setTimeout(() => {
          this.wechatCodeLoading = false
          localStorage.setItem('token', data.token)

          const userInfo = {
            id: data.id,
            nickname: data.nickname,
            type: data.type,
            avatar_url: data.avatar_url
          }

          localStorage.setItem('userInfo', JSON.stringify(userInfo))

          // 如果未绑定手机，跳转绑定手机页面
          if (!data.mobile) {
            this.$router.replace('/bindmobile')
            return
          }

          this.$router.replace('/company')
        }, 1000)
      }
    },

    // 用户协议
    fn_jumpToAgreement () {
      window.open('https://shimo.im/docs/WkvTt8r3RDGQ8RvW/')
    }

  },

  components: {
    loginHeader,
    loginCard,
    loginFooter
  }
}
</script>

<style lang="scss" scoped>
.login-loading {
  .el-loading-spinner i,
  .el-loading-text {
    font-size: 14px;
    color: #595959;
  }

  .el-loading-spinner i {
    font-size: 32px;
  }
}

.login {
  position: relative;
  height: 100vh;
  width: 100%;
  min-height: 768px;
  display: flex;
  align-items: center;
  justify-content: center;

  &-title {
    font-size: 20px;
    color: #262626;
    font-weight: 500;
  }

  &-info {
    color: #8c8c8c;
  }

  &-regular {
    color: #595959;

    &.is-link {
      cursor: pointer;
    }
  }

  &-tips {
    font-size: 13px;
  }

  &-line {
    position: relative;
    z-index: 2;

    &::before {
      position: absolute;
      content: "";
      left: 50%;
      top: 50%;
      width: 224px;
      height: 1px;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.06);
      z-index: -1;
    }

    &::after {
      position: absolute;
      content: "";
      left: -15%;
      top: 0;
      height: 100%;
      width: 130%;
      background-color: #fff;
      z-index: -1;
    }
  }

  &-wechat {
    display: flex;
    align-items: center;
    justify-content: center;

    &__logo {
      margin-right: 8px;
    }

    &__code {
      width: 190px;
      height: 190px;
      margin-top: 24px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 10px;
    border: 1px solid #eee;
    box-sizing: border-box;

    img {
      width: 100%;
      border-radius: 50%;
    }
  }

  &-name {
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
  }

  &-wecom {
    display: flex;
    align-items: center;
    justify-content: center;

    &__logo {
      margin-right: 6px;
    }

    &__title {
      color: #2f7dcd;
      margin-right: 6px;
    }
  }

  ::v-deep &-btn {
    &__block {
      width: 100%;
      display: block;
      padding: 0 20px;
      height: 44px;
      line-height: 44px;

      &.mobile {
        margin-top: 16px;
      }
    }
  }
}
</style>
