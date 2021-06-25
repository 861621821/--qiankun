<template>
  <div class="login">
    <login-header showUserInfo></login-header>

    <login-card>
      <div class="login-title">绑定手机号</div>
      <div class="login-info qy-mtop__1">
        为了您的账号安全，首次注册请绑定手机
      </div>
      <el-form
        :model="formMobile"
        :rules="formMobileRules"
        ref="formMobileRef"
        class="login-form__mobile qy-mtop__8"
      >
        <el-form-item
          prop="mobile"
          :error="mobileTips"
          :class="mobileItemClass"
        >
          <el-row>
            <el-col :span="24">
              <el-input
                v-model="formMobile.mobile"
                placeholder="请输入手机号"
                :suffix-icon="mobileSuffixIcon"
                maxlength="11"
                :disabled="mobileDisable"
                @input="fn_resetMobileTips"
              >
                <template slot="prepend"
                  ><i class="ri-tablet-line"></i
                ></template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="12">
            <el-col :span="15">
              <el-input
                v-model="formMobile.code"
                placeholder="请输入验证码"
                maxlength="6"
                :disabled="codeDisable"
              >
                <template slot="prepend"
                  ><i class="ri-shield-check-line"></i></template
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                @click="fn_getCheckCode"
                :disabled="checkCodeBtnDisable"
                style="display: block; width: 100%"
              >
                <template v-if="checkCodeBtnDisable && !mobileDisable"
                  >{{ checkCodeTimeOut / 1000 }}s</template
                >
                <template v-else>发送验证码</template>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn__block mobile"
            :loading="bindMobileLoading"
            @click="fn_bindMobile('formMobileRef')"
            >{{ bindMobileText }}</el-button
          >
        </el-form-item>
      </el-form>
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
  name: 'bindmoble',
  data () {
    return {
      formMobile: {
        mobile: '',
        code: ''
      },
      formMobileRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'change' },
          { min: 6, max: 6, message: '验证码长度为 6 个字符' }
        ]
      },
      mobileSuffixIcon: '',
      mobileItemClass: '',
      mobileDisable: false,
      mobileTips: '',
      codeDisable: false,
      checkCodeInterval: null,
      checkCodeTimeOut: 60000,
      checkCodeBtnDisable: false,
      bindMobileLoading: false,
      bindMobileText: '完成绑定'
    }
  },

  created () {

    // 判断是否已登录
    const token = localStorage.getItem('token')
    if (!token) {

      this.$router.replace('/login')

    }
  },

  methods: {

    // 获取验证码
    fn_getCheckCode () {

      // 验证手机号
      this.$refs.formMobileRef.validateField('mobile', async error => {
        if (!error) {

          // 检测中状态
          this.mobileDisable = true
          this.mobileSuffixIcon = 'el-icon-loading'
          this.checkCodeBtnDisable = true

          const data = await this.axios.post('checkCode', {
            mobile: this.formMobile.mobile
          })

          if (data.code === 0) {

            //   // 错误提示
            this.mobileSuffixIcon = 'el-icon-error q-danger'
            this.mobileTips = data.message
            this.checkCodeBtnDisable = false

          } else {


            // 已发送验证码提示
            this.mobileDisable = false
            this.mobileSuffixIcon = 'el-icon-success q-success'
            this.mobileItemClass = 'el-form-item--success'
            this.mobileTips = '验证码已发送'

            // 验证码倒计时 60s
            this.checkCodeInterval = setInterval(() => {
              this.checkCodeTimeOut -= 1000
              if (this.checkCodeTimeOut === 0) {
                clearInterval(this.checkCodeInterval)
                this.checkCodeTimeOut = 60000
                this.checkCodeBtnDisable = false
              }
            }, 1000)
          }

        }
      })
    },

    // 绑定手机
    fn_bindMobile (formName) {

      // 表单验证
      this.$refs[formName].validate(async (valid) => {
        if (valid) {

          this.bindMobileLoading = true
          this.bindMobileText = '绑定中，请稍等'
          this.mobileDisable = true
          this.codeDisable = true
          this.checkCodeBtnDisable = true

          const data = await this.axios.post('bindMobile', this.formMobile)

          setTimeout(() => {

            // 检测手机号是否存在
            if (data.code === 0) {

              // 已存在
              this.$message.error(data.msg)

            } else {

              // 绑定成功
              this.$router.replace('/company')

            }

            this.bindMobileLoading = false
            this.bindMobileText = '完成绑定'
            this.mobileDisable = false
            this.codeDisable = false
            this.checkCodeBtnDisable = false

          }, 1000)

        }
      })
    },

    // 重置手机验证提示
    fn_resetMobileTips () {
      this.mobileSuffixIcon = ''
      this.mobileTips = ''
      this.mobileItemClass = ''
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
@import "./components/login.scss";
.login {
  &-form {
    &__mobile {
      width: 310px;
    }
  }
}

.el-form-item {
  &.el-form-item--default {
    ::v-deep .el-input__inner {
      &,
      &:focus {
        border-color: #dcdfe6;
      }
    }
  }
  &.el-form-item--error {
    ::v-deep .el-input__inner {
      &,
      &:focus {
        border-color: #dcdfe6;
      }
    }
  }

  &.el-form-item--success {
    ::v-deep .el-input__inner {
      &,
      &:focus {
        border-color: #dcdfe6;
      }
    }
    ::v-deep.el-form-item__error {
      color: #52c41a;
    }
  }
}
</style>