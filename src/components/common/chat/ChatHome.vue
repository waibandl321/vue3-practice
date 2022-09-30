<template>
  <div class="chat-main">
    <div class="chat-home-alert">
      <AppAlert
        :success="params.success"
        :error="params.error"
      />
    </div>
    <div>
      トークルームを選択して<br>
      メッセージを送りましょう
    </div>
  </div>
</template>

<script>
import AppAlert from '@/components/common/AppAlert.vue';
import { inject } from '@vue/runtime-core';

export default {
  setup() {
    const params = inject('params')
    return {
      params
    }
  },
  components: {
    AppAlert
  }
}
</script>

<style scoped>
.chat-main {
  width: calc(100% - 300px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.chat-home-alert {
  position: absolute;
  top: 0;
  left: 16px;
  right: 16px;
}
</style>