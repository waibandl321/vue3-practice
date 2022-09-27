<template>
  <v-alert
    v-show="success"
    type="info"
    class="my-4"
  >{{ success }}
  </v-alert>
  <v-alert
    v-show="error"
    type="error"
    class="my-4"
  >{{ error }}
  </v-alert>
</template>

<script>
export default {
  props: {
    success: {
      default: "",
      type: String
    },
    error: {
      default: "",
      type: String
    }
  },
}
</script>