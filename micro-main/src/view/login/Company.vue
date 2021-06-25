<template>
  <div
    class="company"
    v-loading="configLoading"
    element-loading-text="当前有页面正在配置应用，请先完成配置"
  >
    <!-- haeader -->
    <login-header showUserInfo showUserCenter></login-header>

    <!-- company loading -->
    <div
      class="company-width company-loading"
      v-if="companyLoading"
      v-loading="companyLoading"
      element-loading-text="正在加载您的企业，请稍等"
    ></div>

    <template v-if="!companyLoading">
      <div class="company-width">
        <!-- 服务商列表 -->
        <div class="company-container" v-if="serviceList.length > 0">
          <div class="company-title">我的服务商</div>
          <div class="company-main">
            <el-row :gutter="24">
              <el-col
                :span="6"
                v-for="(item, index) in serviceList"
                :key="index"
              >
                <div
                  class="company-card service"
                  @click="fn_jumpToService(item.corp_id)"
                >
                  <div class="company-card_header">
                    <div class="company-card_title">
                      {{ item.corp_full_name || item.corp_name }}
                    </div>
                    <div class="company-card_user">
                      <div class="avatar">
                        <img
                          :src="item.avatar_url"
                          alt=""
                          v-if="item.avatar_url !== ''"
                        />
                        <img :src="avatarDefault" alt="" v-else />
                      </div>
                      <div class="name">
                        <div class="text" :title="item.nickname">
                          {{ item.nickname }}
                        </div>
                        <div class="gap"></div>
                        <div :class="['title', item.role_type_color]">
                          {{ item.role_type }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- default page 无企业-->
        <template v-if="companyTotal === 0">
          <div class="company-default flex flex-column">
            <img src="../../assets/images/login_reg_default.png" alt="" />
            <div style="margin: 24px 0">
              暂无企业，马上关联企业，创建专属您的企业营销后台
            </div>
            <el-button
              type="primary"
              class="company-default__btn"
              @click="fn_showBindCompanyDialog"
            >
              去关联企业
              <i
                class="el-icon-right el-icon--right company-default__btn-icon"
              ></i
            ></el-button>
          </div>
        </template>

        <!-- company list -->
        <template v-if="companyTotal > 0">
          <div class="company-container">
            <div class="company-title">我的企业</div>

            <div class="company-header">
              <el-row :gutter="24">
                <el-col :span="18">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-plus"
                    @click="fn_showBindCompanyDialog"
                    >关联企业</el-button
                  >
                </el-col>
              </el-row>
            </div>

            <div class="company-main">
              <el-row :gutter="24">
                <el-col
                  :span="6"
                  v-for="(item, index) in companyList"
                  :key="index"
                >
                  <div
                    class="company-card"
                    @click="
                      fn_companyClick(
                        item.corp_status,
                        item.type,
                        item.is_super_admin,
                        index
                      )
                    "
                    v-loading="item.loading"
                    element-loading-text="正在进入企业"
                  >
                    <div class="company-card_header">
                      <div
                        class="company-card_title"
                        :title="
                          item.corp_full_name
                            ? item.corp_full_name
                            : item.corp_name
                        "
                      >
                        {{
                          item.corp_full_name
                            ? item.corp_full_name
                            : item.corp_name
                        }}
                      </div>
                      <div class="company-card_user">
                        <div class="avatar">
                          <img
                            :src="item.avatar_url"
                            alt=""
                            v-if="item.avatar_url !== ''"
                          />
                          <img :src="avatarDefault" alt="" v-else />
                        </div>
                        <div class="name">
                          <div class="text" :title="item.nickname">
                            {{ item.nickname }}
                          </div>
                          <div class="gap"></div>
                          <div :class="['title', item.role_type_color]">
                            {{ item.role_type }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="company-card_content">
                      <div class="company-card_list">
                        <div class="item">
                          <span class="label">企业状态：</span>
                          <template v-if="item.corp_status === 1">
                            <span class="text q-success">已授权</span>
                          </template>
                          <template v-else>
                            <el-tooltip
                              class="item"
                              effect="dark"
                              placement="top"
                              popper-class="q-tooltip"
                            >
                              <div slot="content">
                                您当前登录的企业未安装本系统应<br />用。请联系贵公司创建者登录本系<br />统重新安装应用。
                              </div>
                              <span class="text q-danger"
                                >未授权 <i class="el-icon-warning-outline"></i
                              ></span>
                            </el-tooltip>
                          </template>
                        </div>
                        <div class="item">
                          <span class="label">员工状态：</span>
                          <template v-if="item.corp_status === 0">
                            <el-tooltip
                              class="item"
                              effect="dark"
                              placement="top"
                              popper-class="q-tooltip"
                            >
                              <div slot="content">
                                您当前登录的企业第三方应用未授<br />权您访问。请联系贵公司企业微信<br />管理员为您配置应用权限。
                              </div>
                              <span class="text q-danger"
                                >第三方应用未授权
                                <i class="el-icon-warning-outline"></i
                              ></span>
                            </el-tooltip>
                          </template>
                          <template v-else>
                            <template v-if="item.type === 0">
                              <el-tooltip
                                class="item"
                                effect="dark"
                                placement="top"
                                popper-class="q-tooltip"
                              >
                                <div slot="content">
                                  您当前登录的企业第三方应用未授<br />权您访问。请联系贵公司企业微信<br />管理员为您配置应用权限。
                                </div>
                                <span class="text q-danger"
                                  >第三方应用未授权
                                  <i class="el-icon-warning-outline"></i
                                ></span>
                              </el-tooltip>
                            </template>
                            <template v-else-if="item.type === 1">
                              <el-tooltip
                                class="item"
                                effect="dark"
                                placement="top"
                                popper-class="q-tooltip"
                              >
                                <div slot="content">
                                  您当前登录的企业自建应用未授权<br />您访问，请联系贵公司企业微信管<br />理员为您配置自建应用权限。
                                </div>
                                <span class="text q-danger"
                                  >自建应用未授权
                                  <i class="el-icon-warning-outline"></i
                                ></span>
                              </el-tooltip>
                            </template>
                            <template v-else-if="item.type === 2">
                              <el-tooltip
                                class="item"
                                effect="dark"
                                placement="top"
                                popper-class="q-tooltip"
                              >
                                <div slot="content">
                                  您当前登录的企业未完成自建应用<br />配置，无法正常使用后台功能，请<br />联系贵公司创建者登录配置。
                                </div>
                                <span class="text q-danger"
                                  >自建应用未正确配置
                                  <i class="el-icon-warning-outline"></i
                                ></span>
                              </el-tooltip>
                            </template>
                            <template v-else>
                              <span class="text q-success">已授权</span>
                            </template>
                          </template>
                        </div>
                        <div class="item">
                          <span class="label">员工数量：</span>
                          <span class="text">{{ item.corp_count }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- 关联企业弹框 -->
    <el-dialog
      :visible.sync="bindCompanyDialog"
      width="400px"
      custom-class="q-dialog login-card"
      center
    >
      <div class="flex flex-column">
        <div class="login-title">关联企业</div>
        <div class="flex" style="margin-top: 40px">
          <img src="../../assets/images/logo_slogon.png" alt="" />
          <img
            src="../../assets/images/ic_x.png"
            alt=""
            style="margin: 0 20px"
          />
          <img src="../../assets/images/wechat_qy_m.png" alt="" />
          <span style="color: #2f7dcd; font-size: 20px">企业微信</span>
        </div>

        <div class="login-info" style="margin-top: 50px">
          企业未安装应用，如果你是管理员，请先安装
        </div>

        <div style="width: 310px; margin-top: 12px">
          <el-button
            class="login-btn__block"
            type="primary"
            @click="fn_jumpToBindWecom"
          >
            <div class="flex flex-center">
              <img
                src="../../assets/images/wechat_qy_white.png"
                alt=""
                style="margin-right: 8px"
              />
              <span>我是管理员 去安装应用</span>
            </div>
          </el-button>
        </div>

        <div class="login-info" style="margin-top: 24px">
          企业已安装应用，员工请直接扫码登录
        </div>

        <div style="width: 310px; margin-top: 12px">
          <el-button
            class="login-btn__block"
            type="primary"
            plain
            @click="fn_jumgToLogin"
          >
            <div class="flex flex-center">
              <img
                src="../../assets/images/wechat_qy.png"
                alt=""
                style="margin-right: 8px"
              />
              <span>我是员工 扫码登录</span>
            </div>
          </el-button>
        </div>

        <el-button
          type="text"
          style="margin-top: 42px; margin-bottom: 32px"
          @click="fn_registerWecom"
          >还没有企业微信，去注册<i class="el-icon-arrow-right"></i
        ></el-button>
      </div>
    </el-dialog>

    <!-- 进入企业 -->
    <el-dialog
      :visible.sync="enterDialog"
      width="320px"
      custom-class="q-dialog login-card"
      center
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="flex flex-center flex-column">
        <div
          class="login-title flex"
          v-if="enterDialogTitle"
          style="margin-top: 40px"
        >
          <img
            style="margin-right: 8px"
            src="../../assets/images/ic_success.png"
            alt=""
          />
          <span>{{ enterDialogTitle }}</span>
        </div>
        <div style="margin-top: 40px">
          <div class="login-avatar">
            <img
              :src="companyUser.avatar_url"
              alt=""
              v-if="companyUser.avatar_url !== ''"
            />
            <img :src="avatarDefault" alt="" v-else />
          </div>
        </div>
        <div class="login-name">{{ companyUser.nickname }}</div>

        <div class="flex flex-center login-info" style="margin-top: 24px">
          <i class="el-icon-loading" style="margin-right: 6px"></i>
          <span class="login-info">即将进入企业…</span>
        </div>

        <div style="margin-top: 16px; margin-bottom: 40px">
          {{ companyName }}
        </div>
      </div>
    </el-dialog>

    <!-- 关联/登录失败弹框 -->
    <el-dialog
      :visible.sync="loginDialogVisable"
      width="400px"
      custom-class="q-dialog login-card"
      center
    >
      <div class="flex flex-center flex-column">
        <div class="login-title">{{ loginDialogTitle }}</div>
        <div style="margin-top: 74px">
          <img src="../../assets/images/login_un_default.png" alt="" />
        </div>

        <div
          class="login-tips"
          style="margin-top: 56px; text-align: center"
          v-html="loginDialogText"
        ></div>
        <div style="width: 100%; margin-top: 20px; margin-bottom: 40px">
          <el-button
            class="login-btn__block"
            type="primary"
            @click="fn_showBindCompanyDialog"
            >返回</el-button
          >
        </div>
      </div>
    </el-dialog>

    <!-- 点击企业卡片状态弹框 -->
    <el-dialog
      :title="errorDialogTitle"
      :visible.sync="errorDialogVisible"
      width="480px"
      custom-class="q-dialog"
    >
      <template v-if="errorDialogType === 'type1'">
        <div>
          您当前登录的企业未安装本系统应用。请联系贵公司<span
            style="color: rgba(0, 0, 0, 0.85)"
            >创建者<img :src="adminAvatar" alt="" class="admin-avatar" />{{
              adminName
            }}</span
          >
          登录本系统重新安装应用。
        </div>
      </template>
      <template v-if="errorDialogType === 'type2'">
        <div>
          您当前登录的企业第三方应用未授权您访问。请联系贵公司企业<span
            style="color: rgba(0, 0, 0, 0.85)"
            >微信管理员<img :src="adminAvatar" alt="" class="admin-avatar" />{{
              adminName
            }}</span
          >
          为您配置应用权限。
        </div>
      </template>
      <template v-if="errorDialogType === 'type3'">
        <div>
          您当前登录的企业未完成自建应用配置，无法正常使用后台功能，请联系贵公司<span
            style="color: rgba(0, 0, 0, 0.85)"
            >创建者<img :src="adminAvatar" alt="" class="admin-avatar" />{{
              adminName
            }}</span
          >
          登录配置。
        </div>
      </template>
      <template v-if="errorDialogType === 'type4'">
        <div>
          您当前登录的企业自建应用未授权您访问，请联系贵公司企业<span
            style="color: rgba(0, 0, 0, 0.85)"
            >微信管理员<img :src="adminAvatar" alt="" class="admin-avatar" />{{
              adminName
            }}</span
          >
          为您配置自建应用权限。
        </div>
      </template>
      <div slot="footer">
        <el-button
          @click="errorDialogVisible = false"
          size="small"
          type="primary"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 注册查询框 -->
    <!-- <el-dialog
      :visible.sync="registerDialogVisable"
      width="400px"
      custom-class="q-dialog login-card"
      center
    >
      <div class="flex flex-center flex-column">
        <div class="login-title">企业微信注册中</div>
        <div style="margin-top: 74px">
          <img src="../../assets/images/login_reg_default.png" alt="" />
        </div>

        <div class="login-tips" style="margin-top: 56px; text-align: center">
          请在注册完成后，返回这里确认
        </div>
        <div style="width: 100%; margin-top: 20px; margin-bottom: 40px">
          <el-button
            class="login-btn__block"
            type="primary"
            :loading="checkRegisterLoading"
            @click="fn_checkRegister"
            >已注册完成，点击进入后台</el-button
          >
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import api from '@/common/apis_g'
import loginHeader from './components/LoginHeader'
import initMenu from '@/common/initMenu'
export default {
  name: 'Company',

  data () {
    return {
      userInfo: {},
      companyLoading: true,
      serviceList: [],
      serviceTotal: null,
      companyTotal: null,
      companyInput: '',
      companyList: [],
      bindCompanyDialog: false,
      adminName: '',
      adminAvatar: '',
      dialogType: '',
      enterDialog: false,
      enterDialogTitle: '',
      companyUser: {},
      companyName: '',
      pathInterval: null,
      configLoading: false,
      loginDialogVisable: false,
      loginDialogTitle: '',
      loginDialogText: '',
      errorDialogVisible: false,
      errorDialogTitle: '',
      errorDialogType: '',
      registerDialogVisable: true,
      registerCode: null,
      checkRegisterLoading: false,
      outInterval: null,
      avatarDefault: require('@/assets/images/default_avatar.png')
    }
  },

  async created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))

    // 监听多开页面的路径跳转
    this.pathInterval = setInterval(() => {
      const _path = localStorage.getItem('path')
      if (_path && _path.indexOf('login') <= -1) {
        this.$router.push(_path)
        this.fn_removePath()
      }

      const _config = localStorage.getItem('config')
      if (_config) {
        this.configLoading = true
      } else {
        this.configLoading = false
      }
    }, 200)

    this.outInterval = setInterval(() => {
      // 如果手动清除缓存或者其他页面退出登录
      const _token = localStorage.getItem('token')
      if (!_token) {
        this.$router.replace('login')
        this.$message.info('请重新登录')
      }
    }, 1000)

    // 如果当前 token 为企业 token，则获取账号 token
    const _type = localStorage.getItem('type')
    if (_type === 'wecom') {
      await this.fn_getAccountToken()
    }

    // 获取服务商列表
    this.fn_getServiceList()

    // 获取企业列表
    this.fn_getCompnayList()

    // 如果点击员工登录后从企微返回
    if (this.$route.query.auth_code) {
      localStorage.removeItem('backCompanyId')
      await this.fn_wecomLogin(this.$route.query.auth_code)
    }

    if (localStorage.getItem('outPath')) {
      setTimeout(() => {
        localStorage.removeItem('outPath')
      }, 500)
    }
  },

  destroyed () {
    if (this.pathInterval) {
      clearInterval(this.pathInterval)
    }
    if (this.outInterval) {
      clearInterval(this.outInterval)
    }
  },

  methods: {

    // 获取服务商列表
    async fn_getServiceList () {
      const Authorization = localStorage.getItem('token')
      const data = await this.axios.post('serviceList', Authorization)

      if ((data && data.code) || (data && data.code === 0)) {
        this.$message.error(data.msg)
        return false
      }

      if (data.length > 0) {
        this.serviceList = data.map(item => {
          if (item.role_type === '超级管理员') {
            item.role_types = 2
            item.role_type_color = 'warning'
          } else if (item.role_type === '管理员') {
            item.role_types = 1
            item.role_type_color = 'primary'
          } else {
            item.role_types = 0
          }
          item.loading = false
          return item
        })
      }
    },

    // 跳转服务商
    fn_jumpToService (id) {
      const Authorization = localStorage.getItem('token')
      let http = 'https://partner.01lb.com.cn'
      if (process.env.NODE_ENV === 'test') {
        http = 'http://partner.test.01lb.com.cn'
      } else if (process.env.NODE_ENV === 'dev') {
        http = 'http://partner.dev.01lb.com.cn'
      } else if (process.env.NODE_ENV === 'prod') {
        http = 'https://partner.01lb.com.cn'
      }
      window.open(`${http}/transfer?token=${Authorization}&companyId=${id}`, '_blank')
    },

    // 获取企业列表
    async fn_getCompnayList () {
      const data = await this.axios.get('wecomList')

      if (data.data) {
        this.companyList = data.data.map(item => {
          if (item.role_type === '超级管理员') {
            item.role_types = 2
            item.role_type_color = 'warning'
          } else if (item.role_type === '管理员') {
            item.role_types = 1
            item.role_type_color = 'primary'
          } else {
            item.role_types = 0
          }
          item.loading = false
          return item
        })
      } else {
        this.companyList = []
      }

      this.companyLoading = false
      this.companyTotal = data.total
    },

    // 点击企业卡片
    async fn_companyClick (corpType, type, role, index) {
      this.adminName = this.companyList[index].creator_nickname
      this.adminAvatar = this.companyList[index].creator_avatar_url
      this.errorDialogType = type

      // 判断状态
      if (corpType === 0) {
        // 企业未授权
        if (role === 1) {
          // 超级管理员，跳转企业授权页面
          localStorage.setItem('companyId', this.companyList[index].corp_id)
          localStorage.setItem('companyName', this.companyList[index].corp_full_name)
          this.fn_jumpToBindWecom()
        } else {
          // 非超级管理员，弹框提示
          this.errorDialogType = 'type1'
          this.errorDialogVisible = true
          this.errorDialogTitle = '请安装本系统应用'
          this.adminName = this.companyList[index].creator_nickname
        }
      } else {
        if (type === 0) {
          this.errorDialogType = 'type2'
          this.errorDialogVisible = true
          this.errorDialogTitle = '第三方应用未授权'
        } else if (type === 1) {
          // 自建应用未授权
          this.errorDialogType = 'type4'
          this.errorDialogVisible = true
          this.errorDialogTitle = '自建应用未授权'
        } else if (type === 2) {
          if (role === 1) {
            localStorage.setItem('companyId', this.companyList[index].corp_id)
            localStorage.setItem('companyName', this.companyList[index].corp_full_name ? this.companyList[index].corp_full_name : this.companyList[index].corp_name)
            // 自建应用未正确配置，超级管理员，跳转配置自建应用页面
            this.fn_jumpToConfig(index)
          } else {
            // 自建应用未正确配置，非超级管理员，弹框提示
            this.errorDialogType = 'type3'
            this.errorDialogVisible = true
            this.errorDialogTitle = '自建应用未正确配置'
          }
        } else if (type === 3) { // 以上都已授权，进入后台
          this.enterDialog = true
          this.enterDialogTitle = ''
          this.companyName = this.companyList[index].corp_full_name ? this.companyList[index].corp_full_name : this.companyList[index].corp_name
          this.companyUser = {
            avatar_url: this.companyList[index].avatar_url,
            nickname: this.companyList[index].nickname
          }
          localStorage.removeItem('backCompanyId')
          localStorage.setItem('companyId', this.companyList[index].corp_id)
          localStorage.setItem('companyName', this.companyList[index].corp_full_name ? this.companyList[index].corp_full_name : this.companyList[index].corp_name)
          localStorage.setItem('type', 'wecom')
          await this.fn_getCompanyToken()
          initMenu()
        }
      }
    },

    // 关联企业弹框
    fn_showBindCompanyDialog () {
      if (this.loginDialogVisable) {
        this.loginDialogVisable = false
      }
      this.bindCompanyDialog = true
    },

    // 跳转企微关联企业
    async fn_jumpToBindWecom () {
      const data = await this.axios.get('authUrl', {
        params: {
          redirect: api.frontHost + '/configapp'
        }
      })
      window.location.href = data.url
    },

    // 跳转员工登录
    async fn_jumgToLogin () {
      const data = await this.axios.get('qrcodeUrl',
        {
          params: {
            redirect: api.frontHost + '/company'
          }
        }
      )
      window.location.href = data.url
    },

    // 员工登录
    async fn_wecomLogin (code) {
      // 清空路径参数
      this.$router.push({
        query: {}
      })

      const data = await this.axios.post('loginByWecomQrcode', {
        auth_code: code
      })

      // 异常处理
      if (data.code) {
        const _code = data.code
        this.loginDialogVisable = true

        if (_code === 5002) {
          // 5002， 企微未授权
          this.loginDialogTitle = '登录失败，企业未安装应用'
          this.loginDialogText = '您正在登录的企业没有安装<span style="color: #262626">零一无限增长应用</span>，<br>请重新选择企业或者安装应用'
          return
        }

        if (_code === 5003) {
          // 5003，企微用户未授权
          this.loginDialogTitle = data.msg
          this.loginDialogText = '您当前登录的企业未授权您访问，<br>请联系贵公司企业微信<span style="color: rgba(0, 0, 0, .85)">管理员</span>为你配置应用权限'
          return
        }

        if (_code === 5004) {
          // 5004, 企业身份重复
          const _corp = localStorage.getItem('companyName')
          const _name = this.userInfo.nickname
          this.loginDialogTitle = '企业身份重复'
          this.loginDialogText = `同一个企业内您只能拥有1个身份，当前企业身份：${_corp}(${_name})，请勿重复绑定该企业的其他身份。其他员工请使用其对应的微信账号自行注册绑定。`
        }
      } else {
        // 管理员昵称
        const _name = data.wecom.creator_nickname

        if (data.is_auth_third_app === 0) {
          // 第三方应用未授权，员工权限时出现
          this.loginDialogVisable = true
          this.loginDialogTitle = '第三方应用未授权'
          this.loginDialogText = `您当前登录的企业第三方应用未授权您访问，<br>请联系贵公司企业微信<span style="color: rgba(0, 0, 0, .85)">管理员：${_name}</span> 为你配置应用权限`
          return
        }

        if (data.wecom.is_create_app === 0) {
          // 自建应用未正确配置
          this.loginDialogVisable = true
          this.loginDialogTitle = '自建应用未正确配置'
          this.loginDialogText = `您当前登录的企业未完成自建应用配置，<br>无法正常使用后台功能，请联系贵公司<span style="color: rgba(0, 0, 0, .85)">创建人：${_name}</span> 登录配置`
          return
        }

        if (data.is_auth_app === 0) {
          // 自建应用未授权，员工权限时出现
          this.loginDialogVisable = true
          this.loginDialogTitle = '自建应用未授权'
          this.loginDialogText = `您当前登录的企业自建应用未授权您访问，<br>请联系贵公司企业<span style="color: rgba(0, 0, 0, .85)">微信管理员：${_name}</span> 为您配置自建应用权限`
          return
        }

        // 员工登录成功
        this.enterDialog = true
        this.enterDialogTitle = '登录成功'
        this.companyName = data.wecom.corp_full_name ? data.wecom.corp_full_name : data.wecom.corp_name
        this.companyUser = {
          avatar_url: data.avatar_url,
          nickname: data.nickname
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('companyName', data.wecom.corp_full_name ? data.wecom.corp_full_name : data.wecom.corp_name)
        localStorage.setItem('companyId', data.wecom.id)
        localStorage.setItem('type', 'wecom')
        initMenu()
      }
    },

    // 跳转配置
    async fn_jumpToConfig (index) {
      this.$router.push('/configapp')
      localStorage.setItem('configapp', true)
    },

    // 跳转企微注册企业
    async fn_registerWecom () {
      this.bindCompanyDialog = false
      // const data = await this.axios.get('registerUrl')
      // this.registerCode = data.register_code
      // this.registerDialogVisable = true

      // 跳转企微自行注册企业（无任何绑定关系）
      window.open('https://work.weixin.qq.com/wework_admin/register_wx?from=myhome_openApi', '_blank')
    },

    // async fn_checkRegister () {
    //   this.checkRegisterLoading = true

    //   const data = await this.axios.get('registerCodeStatus', {
    //     params: {
    //       register_code: this.registerCode
    //     }
    //   })

    //   if (data.success === 1) {

    //     localStorage.setItem('token', data.token)
    //     localStorage.setItem('companyId', data.wecom_id)
    //     this.$router.push('/config')

    //   } else {

    //     this.$message.warning('注册未完成,请重试')

    //   }

    //   this.registerCodeLoading = false
    // },

    // 账号token
    async fn_getAccountToken () {
      const data = await this.axios.post('getAccountToken')
      localStorage.setItem('token', data.token)
      localStorage.setItem('type', 'account')
    },

    // 获取企业token
    async fn_getCompanyToken () {
      const data = await this.axios.post('getToken')
      localStorage.setItem('type', 'wecom')
      localStorage.setItem('token', data.token)
    },

    // 清除路径信息
    fn_removePath () {
      setTimeout(() => {
        localStorage.removeItem('path')
      }, 100)
    }

  },

  async beforeRouteLeave (to, from, next) {
    // 如果返回企业管理
    const id = localStorage.getItem('backCompanyId')
    if (id && to.path !== '/login') {
      localStorage.removeItem('backCompanyId')
      await this.fn_getCompanyToken()
    }
    next()
  },

  components: {
    loginHeader
  }
}
</script>

<style lang="scss" scoped>
@import "./components/login.scss";
@import "@/assets/scss/utils.scss";

.login-title {
  margin-top: 16px;
}

.company {
  position: relative;
  padding-top: 64px;
  display: flex;
  // justify-content: center;
  min-height: calc(100% - 64px);

  &-width {
    width: 1200px;
    margin: 0 auto;
  }

  ::v-deep &-loading {
    .el-loading-mask {
      background-color: transparent;
    }
  }

  &-default {
    margin-top: 26vh;

    ::v-deep &__btn {
      &-icon {
        position: relative;
        left: 0;
        transition: 0.25s;
      }

      &:hover {
        .company-default__btn-icon {
          left: 6px;
        }
      }
    }
  }

  &-title {
    position: relative;
    font-size: 18px;
    font-weight: 500;
    color: #262626;
    margin: 24px 0;
    padding-left: 12px;
    line-height: 24px;

    &:before {
      position: absolute;
      content: "";
      top: 50%;
      left: 0;
      width: 4px;
      height: 16px;
      background-color: #338bff;
      border-radius: 2px;
      transform: translateY(-50%);
    }
  }

  &-header {
    margin: 0 0 24px 0;
  }

  &-card {
    position: relative;
    min-height: 340px;
    margin-bottom: 24px;
    border-radius: 4px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    transition: 0.25s;
    background: url("../../assets/images/company_bg.png") right 101% no-repeat
      #fff;
    cursor: pointer;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.05);
    }

    &_loading {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    &_header {
      padding: 24px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    &_title {
      font-weight: 500;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 16px;
      @include ellipsis;
    }

    &_user {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 10px;
        line-height: 1;
        img {
          width: 24px;
          height: 24px;
          border-radius: 2px;
        }
      }
      .name {
        display: flex;
        align-items: center;
        overflow: hidden;
        .text {
          flex: 1;
          @include ellipsis;
        }
      }
      .gap {
        width: 1px;
        height: 12px;
        background-color: rgba(0, 0, 0, 0.15);
        margin: 0 10px;
      }
      .title {
        height: 24px;
        display: flex;
        align-items: center;
        padding: 0 4px;
        border-radius: 2px;
        background: rgba(0, 0, 0, 0.04);
        color: rgba(0, 0, 0, 0.65);
        font-size: 12px;
        box-sizing: border-box;

        &.warning {
          background: #fffbe6;
          color: #faad14;
        }

        &.primary {
          background: #ebf2fe;
          color: #338bff;
        }
      }
    }

    &_userContent {
      overflow: hidden;
    }

    &_name {
      display: flex;
      .text {
        @include ellipsis;
      }
    }

    &_content {
      padding: 24px;
    }

    &_list {
      font-size: 12px;
      .item {
        line-height: 22px;
        margin-bottom: 10px;
      }
    }

    &.service {
      min-height: auto;

      .company-card_header {
        border: none;
      }
    }
  }
}

.admin-avatar {
  position: relative;
  top: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 0 6px;
}
</style>
