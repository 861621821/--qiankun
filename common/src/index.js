import store from './store'
import utils from './utils'
import api from './api'
import SideBar from './components/SideBar.vue'
import TabBar from './components/TabBar.vue'
import TagsView from './components/TagsView.vue'

export const commonStore = store
export const commonUtils = utils
export const commonApi = api
export const commonComponents = {
  SideBar,
  TabBar,
  TagsView
}
