<template>
  <div class="login-header">
    <div class="login-width flex">
      <div class="flex">
        <div class="flex flex-center">
          <img
            src="../../../assets/images/logo_slogon.png"
            style="margin-right: 24px; height: 24px"
          />

          <el-link
            v-if="showWork"
            href="https://open.work.weixin.qq.com"
            :underline="false"
            target="_blank"
            style="line-height: 1"
            ><img
              src="https://open.work.weixin.qq.com/service/img?id=ww05b19b61e036e5f4&t=isp&c=white&s=medium"
              srcset="
                https://open.work.weixin.qq.com/service/img?id=ww05b19b61e036e5f4&t=isp&c=white&s=medium@2x 2x
              "
              referrerpolicy="unsafe-url"
              alt="企业微信服务商"
          /></el-link>
        </div>

        <el-dropdown v-if="showCompany" @command="fn_CompanyCommand">
          <span class="el-dropdown-link">
            <div class="login-header__user">
              {{ companyName ? companyName : "" }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="company">选择企业</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-dropdown v-if="showUserInfo" @command="fn_userCommand">
        <span class="el-dropdown-link">
          <div class="login-header__user">
            <img
              :src="userInfo.avatar_url"
              alt=""
              class="login-header__user-avatar"
            />
            {{ userInfo.nickname }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user" v-if="showUserCenter"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginHeader',

  props: {
    showWork: {
      type: Boolean,
      default: false
    },
    showUserInfo: {
      type: Boolean,
      default: false
    },
    showUserCenter: {
      type: Boolean,
      default: false
    },
    showCompany: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      userInfo: {
        avatar_url: require('@/assets/images/default_avatar.png'),
        nickname: ''
      },
      companyName: ''
    }
  },

  created () {
    if (this.showUserInfo && localStorage.getItem('userInfo')) {
      const _userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.userInfo.nickname = _userInfo.nickname
      if (_userInfo.avatar_url) {
        this.userInfo.avatar_url = _userInfo.avatar_url
      }
    }

    if (this.showCompany && localStorage.getItem('companyName')) {
      this.companyName = localStorage.getItem('companyName')
    }
  },

  methods: {

    // 用户下拉操作
    fn_userCommand (command) {
      if (command === 'signOut') {
        this.$router.replace('/login')
        localStorage.clear()
      } else if (command === 'user') {
        this.$router.push({
          path: 'user'
        })
      }
    },

    // 企业下拉操作
    fn_CompanyCommand (command) {
      if (command === 'company') {
        this.$router.push('/company')
        localStorage.removeItem('config')
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.login {
  &-width {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
  }

  &-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    height: 64px;
    z-index: 1;

    &__user {
      display: flex;
      align-items: center;

      &-avatar {
        width: 30px;
        height: 30px;
        margin-right: 12px;
        border-radius: 2px;
      }
    }
  }
}
</style>
