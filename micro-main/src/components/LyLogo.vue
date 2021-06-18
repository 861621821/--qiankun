<template>
  <img class="logo" :src="url"/>
</template>
<script>
export default {
  data () {
    return {
      url: require('@/assets/logo.png')
    }
  }
}
</script>
<style lang="scss" scoped>
.logo{
  width: 38px;
  height: 38px;
}
</style>
