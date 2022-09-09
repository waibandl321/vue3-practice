<template>
  <v-container>
    <v-img src="https://placehold.jp/1200x800.png"></v-img>
    <v-card-item>
      <div>タグ名</div>
      <div>タイトル</div>
      <div>投稿者 | 投稿日</div>
    </v-card-item>
    <v-card-item>
      説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文
      説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文
      説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文
      説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '../PcFooter.vue';
  export default {
    name: "forum-detail",
    components: { PcFooter },
    props: {
        params: Object,
        changeMode: Function
    },
    setup(props) {
      const edit = () => {
        props.changeMode('edit')
      }
      const backFunc = () => {
        props.changeMode('list')
      }
      const footer_options = {
        back: [
          { text: '一覧へ戻る', callback: backFunc }
        ],
        next: [
          { text: '修正', callback: edit }
        ]
      }
      return {
        footer_options
      }
    }
}
  </script>