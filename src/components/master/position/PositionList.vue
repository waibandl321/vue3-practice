<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      {{ items }}
      <div>
        <v-table
          fixed-header
          height="300px"
        >
          <thead>
            <tr>
              <th class="text-left">ポジション名</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.position_id"
              @click="recordClick(item)"
            >
              <td>{{ item.position_cd }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div class="fixed-btn">
        <v-btn
          color="primary"
          icon="mdi-plus"
          size="x-large"
          @click="clickNew()"
        ></v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
import positionApiFunc from '@/mixins/api/master/position.js'
import { ref } from 'vue'
export default {
  name: 'position-list',
  components: { MasterLeftMenu },
  props: {
    params: Object,
    changeMode: Function
  },
  setup () {
    const items = ref([])
    const getPositionList = async () => {
      items.value = await positionApiFunc.apiGetPosition()
    }
    getPositionList()

    const is_new = true

    return {
      items,
      is_new
    }
  },
  methods: {
    recordClick (item) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.viewer = item
      this.changeMode('view')
    },
    clickNew () {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.editor = {
        position_cd: "",
        status: 0,
        delete: 0
      }
      this.changeMode('edit', this.is_new)
    }
  }
}
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
</style>
