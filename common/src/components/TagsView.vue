<template>
  <div class="tags-view">
    <transition-group name="tag">
      <span class="tag" :class="{active: item.path === currentPath}" v-for="(item, i) in tags" :key="item.path" @click="handleGoPage(item)">
        {{ item.title }}
        <i class="el-icon-close" v-if="tags.length > 1" @click.stop="handleColseTag(item, i)"></i>
      </span>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    tags(){
      return this.$store.state.global.routesTags
    },
    currentPath(){
      return this.$route.path
    }
  },
  methods: {
    handleGoPage({ path }) {
      if(path !== this.currentPath){
        this.$router.push(path)
      }
    },
    handleColseTag({ path }, i) {
      if(path === this.currentPath){
        let nextRoute = null
        if(i < this.tags.length - 1){
          nextRoute = this.tags[i + 1]
        } else {
          nextRoute = this.tags[i - 1]
        }
        this.$router.push(nextRoute.path)
      }
      this.$store.dispatch('global/removeRoutesTags', path)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view{
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