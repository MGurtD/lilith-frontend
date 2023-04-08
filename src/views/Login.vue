<template>
  <div class="container">
    <LoginForm class="login-form" />
  </div>
</template>
<script setup lang="ts">
  import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped>
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>