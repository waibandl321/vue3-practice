import { useRouter } from "vue-router"

export default {
  getRoutes () {
    return useRouter().options.routes
  },
}