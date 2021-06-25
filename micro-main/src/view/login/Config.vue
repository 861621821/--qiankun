<template>
  <div class="login">
    <login-header showCompany showUserInfo showUserCenter></login-header>

    <login-card>
      <div class="login-title" style="margin-top: 40px">
        还差最后一步啦～扫码自动完成配置
      </div>
      <div class="login-info" style="margin-top: 10px">
        因api企业微信接口权限比较复杂，<br />需企业微信扫码自动配置
      </div>
      <div style="margin-top: 16px; position: relative">
        <img :src="configCodeImg" alt="" style="width: 190px; height: 190px" />
        <div class="config-loading flex flex-center" v-if="codeLoading">
          <div class="flex flex-center flex-column">
            <i class="el-icon-loading"></i>
            <span v-html="codeLoadingText"></span>
          </div>
        </div>
      </div>
      <div class="flex login-info" style="margin-top: 10px">
        请使用
        <img
          src="../../assets/images/wechat_qy.png"
          alt=""
          style="margin-left: 6px; margin-right: 6px"
        />
        <span class="login-wecom__title">企业微信</span>
        手机app扫码
      </div>

      <div class="config-name">{{ companyName }}</div>
      <div class="config-self" @click="fn_jumpToConfigSetting">
        自有技术人员手动配置（不推荐）
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
// 菜单
import initMenu from '@/common/initMenu'
export default {
  name: 'Config',

  data () {
    return {
      codeLoading: true,
      codeLoadingText: '二维码加载中，请稍等',
      configCodeImg: require('../../assets/images/configCode.png'),
      configKey: '',
      companyName: '',
      configInterval: null,
      configTime: 1500
    }
  },

  async created () {

    // 通过企微跳转回来
    const _auth_code = this.$route.query.auth_code

    if (_auth_code) {
      await this.fn_bindWecom(_auth_code)
    }

    const _type = localStorage.getItem('type')
    if (!_type || _type === 'account') {
      await this.fn_getCompanyToken()
    }

    if (localStorage.getItem('companyName')) {
      this.companyName = localStorage.getItem('companyName')
    }

    this.fn_getConfigCode()
  },

  methods: {

    // 关联企业
    async fn_bindWecom (code) {

      // 清空路径参数
      this.$router.replace({
        query: {}
      })

      const data = await this.axios.post('wecom', {
        auth_code: code
      })

      localStorage.setItem('companyName', data.corp_name)
      localStorage.setItem('companyId', data.id)
    },

    // 获取配置二维码
    async fn_getConfigCode () {
      const data = await this.axios.get('authAppQrcode')
      this.configCodeImg = data.url
      this.configKey = data.qrcode_key
      this.codeLoading = false

      this.configInterval = setInterval(() => {
        this.fn_appConfig()
      }, this.configTime)
    },

    // 扫码监听
    async fn_appConfig () {
      const data = await this.axios.get('authAppRes', {
        params: {
          qrcode_key: this.configKey
        }
      })

      if (data.status === '1') {
        // 扫码成功
        this.codeLoading = true
        this.codeLoadingText = '扫码成功<br>请在手机点击登录'
      } else if (data.status === '2' || data.status === '3') {
        // 登录成功
        this.codeLoadingText = '应用配置中<br>请勿刷新或跳转此页面'
      } else if (data.status === '4') {
        // 配置成功
        this.codeLoadingText = '配置完成<br>即将进入后台'
        // 进入后台
        localStorage.setItem('company', true)
        localStorage.removeItem('config')
        initMenu()
      } else if (data.status === '5') {
        this.codeLoading = false
        this.codeLoadingText = ''
        this.$message.info('自动扫码配置已取消')
        clearInterval(this.configInterval)
        this.fn_getConfigCode()
      }
    },

    // 跳转手动配置
    fn_jumpToConfigSetting () {
      this.$router.push('/configuration')
    },

    // 获取企业token
    async fn_getCompanyToken () {
      const data = await this.axios.post('getToken')
      localStorage.setItem('type', 'wecom')
      localStorage.setItem('token', data.token)
    }
  },

  destroyed () {
    if (this.configInterval) {
      clearInterval(this.configInterval)
    }
  },

  beforeRouteLeave (to, from, next) {
    localStorage.removeItem('config')
    next()
  },

  components: {
    loginHeader,
    loginCard,
    loginFooter
  }
}
</script>

<style lang="scss">
@import "./components/login.scss";

.config {
  &-name {
    width: 310px;
    height: 44px;
    color: #338bff;
    background: #f3f8ff;
    border-radius: 4px;
    line-height: 44px;
    margin-top: 24px;
  }

  &-self {
    color: $--color-text-regular;
    margin-top: 30px;
    margin-bottom: 40px;
    cursor: pointer;
  }

  &-loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 190px;
    background-color: rgba(255, 255, 255, 0.95);

    i {
      font-size: 32px;
    }

    span {
      margin-top: 24px;
    }
  }
}
</style>