import store from './store'
import sdk from './sdk'
import api from './api'
import SideBar from './components/SideBar.vue'
import TabBar from './components/TabBar.vue'
import TagsView from './components/TagsView.vue'

export const commonStore = store
export const commonSdk = sdk
export const commonApi = api
export const commonComponents = {
  SideBar,
  TabBar,
  TagsView
}
