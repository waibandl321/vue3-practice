<template>
  <v-container>
    店舗<br>
    {{ params.viewer }}
    <v-card>
      <v-card-title>店舗招待用URL</v-card-title>
      <v-card-text>
        <a :href="createInviteUrl()">{{ createInviteUrl() }}</a>
      </v-card-text>
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
import invitationApiFunc from '@/mixins/api/invitation.js'
export default {
  name: 'shop-invite',
  props: {
    params: Object,
    changeMode: Function
  },
  setup (props) {
    const createInviteUrl = () => {
      return invitationApiFunc.createShopInvitationUrl(props.params.viewer)
    }

    return {
      createInviteUrl
    }
  },
}
</script>