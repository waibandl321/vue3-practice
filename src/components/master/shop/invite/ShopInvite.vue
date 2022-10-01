<template>
  <v-container class="im-container">
    <v-card>
      <v-card-title>店舗招待</v-card-title>
      <v-card-item>
        <v-card-subtitle>招待URL</v-card-subtitle>
        <v-card-text>
          <a :href="invite_url">{{ invite_url }}</a>
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-text>
          <v-card-subtitle>QRコード</v-card-subtitle>
          <QRCodeVue3
            :value="invite_url"
            :width="200"
            :height="200"
            :qrOptions="{ typeNumber: '0', mode: 'Byte', errorCorrectionLevel: 'Q' }"
            :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
            :dotsOptions="{ type: 'square', color: '#05004d' }"
            :cornersSquareOptions="{ type: 'square', color: '#0e013c' }"
          />
        </v-card-text>
      </v-card-item>
    </v-card>
    <footer class="fixed-footer">
      <div class="back">
        <v-btn
          @click="changeMode('list')"
        >店舗一覧へ戻る
        </v-btn>
      </div>
    </footer>
  </v-container>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";
import invitationApiFunc from '@/mixins/api/invitation.js'
import { ref } from '@vue/reactivity';

export default {
  name: 'shop-invite',
  components: {
    QRCodeVue3
  },
  props: {
    params: Object,
    changeMode: Function
  },
  setup (props) {
    const invite_url = ref()
    const createInviteUrl = () => {
      invite_url.value = invitationApiFunc.createShopInvitationUrl(props.params.viewer)
    }
    createInviteUrl()

    return {
      invite_url
    }
  },
}
</script>