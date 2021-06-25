<template>
  <div class="login-card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-card {
    width: 400px;
    min-height: 440px;
    text-align: center;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 2px 10px #eeeff2;
    border-radius: 8px;
    box-sizing: border-box;
  }
}
</style>
