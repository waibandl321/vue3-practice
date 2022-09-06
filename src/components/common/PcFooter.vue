<template>
  <footer class="fixed-footer">
    <div class="back">
      <v-btn
        v-for="(back_option, idx) in options.back"
        :key="idx"
        @click="backFunc(back_option)"
      >{{ back_option.text }}</v-btn>
    </div>
    <div class="next">
      <v-btn
        v-for="(next_option, idx) in options.next"
        :key="idx"
        @click="clickNext(next_option)"
      >{{ next_option.text }}</v-btn>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    options: Object
  },
  methods: {
    // eslint-disable-next-line camelcase
    backFunc (back_option) {
      back_option.callback('list')
    },
    // eslint-disable-next-line camelcase
    clickNext (next_option) {
      next_option.callback('edit')
    }
  }
}
</script>

<style scoped>
.fixed-footer {
  position: fixed;
  height: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}
</style>
