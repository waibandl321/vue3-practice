<template>
  <v-card-actions>
    <v-spacer />
    <div
      v-for="(option, idx) in options"
      :key="idx"
    >
      <v-btn
        :color="option.btn_type"
        :to="option.path"
        @click="option.callback"
      >
        {{ option.text }}
      </v-btn>
    </div>
  </v-card-actions>
</template>

<script>
export default {
  props: {
    options: Object
  }
}
</script>
