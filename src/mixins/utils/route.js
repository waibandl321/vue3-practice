import { useRouter, useRoute } from "vue-router"

export default {
  getRoutes () {
    return useRouter().options.routes
  },
  getCurrentRoute () {
    return useRoute()
  }
}