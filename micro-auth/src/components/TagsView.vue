<template>
  <div class="tags-view">
    <transition-group name="tag">
      <span class="tag" :class="{active: item.path === currentPath}" v-for="(item, i) in tags" :key="item" @click="handleGoPage(item)">
        {{ item.title }}
        <i class="el-icon-close" v-if="tags.length > 1" @click.stop="handleColseTag(item, i)"></i>
      </span>
    </transition-group>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const { push } = useRouter()
    const { state, dispatch } = useStore()
    const tags = state.global.routesTags
    const currentPath = computed(() => route.path)

    // Methods
    const handleGoPage = ({ path }) => push(path)
    const handleColseTag = ({ path }, i) => {
      if(path === currentPath.value){
        let nextRoute = null
        if(i < tags.length - 1){
          nextRoute = tags[i + 1]
        } else {
          nextRoute = tags[i - 1]
        }
        push(nextRoute.path)
      }
      dispatch('global/removeRoutesTags', path)
    }

    return {
      tags,
      currentPath,
      handleGoPage,
      handleColseTag
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view{
  // border-bottom: 1px solid #efefef;
  .tag{
    background: #fff;
    color: #909399;
    cursor: pointer;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    padding: 0 20px;
    position: relative;
    border-right: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    &:first-of-type{
      border-radius: 4px 0 0 0;
    }
    &:last-of-type{
      border-radius: 0 4px 0 0;
      border-right: unset
    }
    &:only-of-type{
      border-radius: 4px 4px 0 0;
    }
    &:hover .el-icon-close{
      display: inline-block;
    }
    &.active{
      color: $main-color;
      border-bottom-color: transparent;
    }
    .el-icon-close{
      display: none;
      position: absolute;
      right: 4px;
      top: 11px;
      cursor: pointer;
    }
  }
}

.tag-enter-active,
.tag-leave-active {
  transition: all 0.28s;
}
.tag-enter-from,
.tag-leave-to {
  opacity: 0;
}
</style>