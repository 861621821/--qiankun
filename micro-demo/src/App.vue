<template>
  <div class="subapp-wrapper">
    <side-bar/>
    <div class="main-wrapper">
      <tags-view/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { commonComponents } from 'common'
export default {
  components: {
    SideBar: commonComponents.SideBar,
    TagsView: commonComponents.TagsView
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.subapp-wrapper{
  display: flex;
  .main-wrapper{
    flex: 1;
  }
}
</style>
