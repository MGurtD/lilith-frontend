<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useStore } from './store';
  import { useRouter } from 'vue-router';
  
  const store = useStore()
  const router = useRouter()

  onMounted(() => {
    if (store.user) {
      router.push("/")
    } else {
      router.push("/login")
    }
  })
</script>

<template>
  <RouterView />

  <Toast position="top-center" />
  <ConfirmDialog />
</template>

<style lang="scss">
@import "./assets/styles.scss";
</style>
