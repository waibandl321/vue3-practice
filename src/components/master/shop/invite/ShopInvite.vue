<template>
  <v-container>
    店舗招待
    {{ params.viewer }}
    <v-card>
      <v-card-title>店舗招待用URL</v-card-title>
      <v-card-text>
        <a :href="invite_url">{{ invite_url }}</a>
      </v-card-text>
    </v-card>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import { ref } from '@vue/reactivity'
import invitationApiFunc from '@/mixins/api/invitation.js'
import PcFooter from '@/components/common/PcFooter.vue'
export default {
  name: 'shop-invite',
  components: {
    PcFooter
  },
  props: {
    params: Object,
    changeMode: Function
  },
  setup (props) {
    const invite_url = ref("")
    const createInviteUrl = () => {
      invite_url.value = invitationApiFunc.createShopInvitationUrl(props.params.viewer)
    }
    createInviteUrl()

    return {
      invite_url
    }
  },
  data () {
    return {
      footer_options: {
        back: [
          { text: '一覧へ戻る', callback: this.changeMode }
        ]
      }
    }
  },
}
</script>